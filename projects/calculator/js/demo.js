function getSequence(equation) {
    return equation.split(",").map(val => eval(val));
}

function findSequenceType(seq) {
    const sequenceTypes = ["linear", "quadratic", "geometric", "invalid"],
          diff = seq[1]-seq[0], ratio = seq[1]/seq[0];
    let hasConstDiff = true, hasConstRatio = true, hasConstSecDiff = true, firstDiffs = [];

    for (let i=1; i<seq.length; i++) {
        if (diff != seq[i]-seq[i-1] && hasConstDiff) {
            hasConstDiff = false;
        } else if ( ratio != seq[i]/seq[i-1] && hasConstRatio ) {
            hasConstRatio = false;
        }

        firstDiffs.push(seq[i]-seq[i-1]);
    }
    
    const secDiff = firstDiffs[1] - firstDiffs[0];
    if (firstDiffs.length>=3) {
        for (let i=1; i<firstDiffs.length; i++) {
            if ( secDiff != firstDiffs[i]-firstDiffs[i-1]) {
                hasConstSecDiff = false;
                break;
            }
        }
    } else {
        hasConstSecDiff = false;
    }

    return hasConstDiff ? sequenceTypes[0] : hasConstRatio ? sequenceTypes[2] : 
            hasConstSecDiff ? sequenceTypes[1] : sequenceTypes[3]
}

function analyseSequence(seq) {
    const stringValue = (val) => {
        if (val>=0) {
            return "+" + val
        }
        return val
    }
    if (seq.length < 3) {
        return "Insufficient data to conclude";
    } 
    
    switch (findSequenceType(seq)) {
        case "linear":
            const d = seq[1]-seq[0],
                sequence = (d + "n") + (seq[0]-d);
            
            return sequence
        case "geometric":
            const r = seq[1]/seq[0];
            return `${seq[0]}(${r})<sup>n-1</sup>`;
        case "quadratic":
            let a = ((seq[2]-seq[1]) - (seq[1]-seq[0]))/2,
                  b = (seq[1]-seq[0]) - 3*a ,
                  c = seq[0] - a - b;
            return `${a}n<sup>2<sup>${stringValue(b)}n${stringValue(c)}`
        default:
            return "seq not linear, geometric or quadratic"
    }
}
