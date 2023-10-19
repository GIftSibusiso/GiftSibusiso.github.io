const button = document.querySelector("button"),
      operators = ["Plus", "Minus", "Mult", "Divide"],
      operator = {
        "Plus": "+",
        "Minus": "-",
        "Divide": "÷", 
        "Mult": "×"
      };
let answerAvail = false;

for ( let i=0; i<10; i++ ) {
    document.querySelector(".btn"+i).addEventListener("click", () => {
        document.querySelector(".equation").innerHTML += i;
        clearAnswer();
    })
}

document.querySelector(".btnC").addEventListener("click", () => {
    document.querySelector(".equation").innerHTML = "";
})

for ( let i=0; i<4; i++ ) {
    document.querySelector(".btn"+operators[i]).addEventListener("click", () => {
        let input = document.querySelector(".equation").innerText;
        console.log(input)
        if ( "+-×÷".includes(input[input.length-1]) ) {
            input = input.slice(0, input.length-1) + operator[operators[i]];
            document.querySelector(".equation").innerHTML = input;
        } else {
            document.querySelector(".equation").innerHTML += operator[operators[i]];
        }
        clearAnswer();
    });
}

document.querySelector(".btnDel").addEventListener("click", () => {
    let text = document.querySelector(".equation").innerHTML,
        txtLen = text.length;

    if (txtLen>1) {
        if (text[text.length-1]==">") {
            document.querySelector(".equation").innerHTML = text.slice(0, txtLen-"x<sup>2</sup>".length);
        } else {
            document.querySelector(".equation").innerHTML = text.slice(0, txtLen-1);
        }
        
    } else {
        document.querySelector(".equation").innerHTML = "";
    }
})

document.querySelector(".btnEqual").addEventListener("click", () => {
    let results = validateEquation();

    if (results.includes("=") || results.includes(",")) {
        alert("Click 'sol' to solve equation");
    } else if (results.includes("X")) {
        document.querySelector(".equation").innerHTML += "=";
        clearAnswer();
    } else {
        document.querySelector(".result").innerHTML = results !== undefined ? eval(validateEquation()) : "";
        answerAvail = true;
    }
})

document.querySelector(".btnDot").addEventListener("click", function () {
    let text = document.querySelector(".equation").innerText;
    if (text[text.length-1] !== "." && !lastValue(text).includes("."))
    document.querySelector(".equation").innerHTML += ".";
    clearAnswer()
})

document.querySelector(".btnSolve").addEventListener("click", function () {
    let equation = validateEquation();
    if (equation.includes(",")) {
        document.querySelector(".result").innerHTML = analyseSequence(getSequence(equation));
    } else {
        document.querySelector(".result").innerHTML = solveEquation(equation);
    }

    answerAvail = true;
})

document.querySelector(".btnX").addEventListener("click", () => {
    document.querySelector(".equation").innerHTML += "X";
    clearAnswer()
})

document.querySelector(".btnX2").addEventListener("click", () => {
    document.querySelector(".equation").innerHTML += "X<sup>2</sup>";
    clearAnswer()
})

document.querySelector(".btnComma").addEventListener("click", () => {
    let text = document.querySelector(".equation").innerText;
    if (text[text.length-1] !== ",")
    document.querySelector(".equation").innerHTML += ",";
    clearAnswer()
})

function clearAnswer() {
    if (answerAvail)
    document.querySelector(".result").innerHTML = "";
    answerAvail = false;
}

function isLastInputOperator( expression ) {
    return operators.includes(expression[expression.length-1]);
}

function lastValue(equation) {
    let value = "";

    for (let i=equation.length-1; i>=0; i--){
        if ("+-×÷".includes(equation[i] )) {
            break;
        }
        value = equation[i] + value;
    }
    return value;
}

function validateEquation() {
    let eq = "";
    const equation = document.querySelector(".equation").innerText,
        operatorMapper = { "÷": "/", "×": "*" };

    if (equation.includes("X")) {
        return xEquation(equation)
    }

    for (let i=0; i<equation.length; i++) {
        if ("÷×".includes(equation[i])) {
            eq += operatorMapper[equation[i]];
            continue;
        }

        eq += equation[i];
    }

    return eq
}

function xEquation() {
    let equation = document.querySelector(".equation").innerHTML;

    return equation.replace("<sup>2</sup>", "xx")
}

// ===============================================================================================================

// Solves for x but the equation must not contain symbols [/,*]

// Returns a list of grouped data
function extractQuotient (equation) {
    console.log(equation);
    let quotients = [[], [], []],
        symb = "/*", expression = "",
        isAfter = false;

    for (let i=0; i<equation.length; i++) {
        if (symb.includes(equation[i])) {
            return null;
        } else if ( i>0 && "/*+-=".includes(equation[i]) || equation.length-1 == i) {
            if ( equation.length-1 == i ) {
                expression += equation[i];
            }

            if (expression.includes("=")) {
                expression = expression.slice(1, expression.length)
            }

            valueAndGroup = getValue(expression, isAfter);
            quotients[valueAndGroup[1]].push(valueAndGroup[0]);
            expression = "";

            if (equation[i] === "=") {
                isAfter = true;
            }
        }

        expression += equation[i];
    }

    return quotients;
}

function getValue(exp, isAfterEqualSign) {
    if (exp=="") {
        return [0, 0]
    }
    
    let value = "", symb="", operators = "/*+-=";;
    for (let i=0; i<exp.length; i++) {
        if ((parseInt(exp[i]) + "") === "NaN" && !operators.includes(exp[i]) && exp[i]!=".") {
            symb += exp[i];
            continue;
        }

        value += exp[i];
    }
    (value.length === 0) ? value = 1 : (operators.includes(value)) ? value += "1"  : value;
    let output = [(isAfterEqualSign ? parseFloat(value) * -1 : parseFloat(value)), (symb.length===1 ? 1 : symb.length>1 ? 0 : 2)];
    return output
}

function solveEquation(equation) {
    let coefficients = extractQuotient(equation),
        a=0, b=0, c=0, count=0;

    coefficients.forEach( values => {
        for (let i=0; i<values.length; i++) {
            count===0 ? a+=values[i] : count===1 ? b+=values[i] : c+=values[i];
        }
        count++;
    } )

    if (a!=0) {
        const x1 = parseFloat((-b+Math.sqrt(Math.pow(b, 2) - 4*a*c))/(2*a)).toFixed(2),
              x2 = parseFloat((-b-Math.sqrt(Math.pow(b, 2) - 4*a*c))/(2*a)).toFixed(2);
        return x1+""=="NaN" ? "Undefined" : x1===x2 ? "x=" + x1 : `x=${x1} | x=${x2}`
    }
    const x = -c/b;
    
    return (x+"" == "NaN") ? "Undefined": x;
}

// ======================================================================================================================================
// Finding nth term of whatever sequence

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
                  sequence = (d + "n") + stringValue(seq[0]-d);
            return sequence
        case "geometric":
            const r = seq[1]/seq[0];
            return `${seq[0]}(${r})<sup>n-1</sup>`;
        case "quadratic":
            let a = ((seq[2]-seq[1]) - (seq[1]-seq[0]))/2,
                  b = (seq[1]-seq[0]) - 3*a ,
                  c = seq[0] - a - b;
            return `${a}n<sup>2</sup>${stringValue(b)}n${stringValue(c)}`
        default:
            return "seq not linear, geometric or quadratic"
    }
}
