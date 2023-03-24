var tela = document.getElementById("num");
var resultados = document.getElementById("resultado");
function clicou(arg) {
    if (arg in[1,2,3,4,5,6,7,8,9,0]) {
        tela.value += arg;
    };
    switch (arg) {
        case "som":
            tela.value += "+";
            break;
        case "sub":
            tela.value += "-";
            break;
        case "div":
            tela.value += "/";
            break;
        case "mul":
            tela.value += "x";
            break;
        case "pA":
            tela.value += "(";
            break;
        case "pF":
            tela.value += ")";
            break;
        case "res":
            tela.value += "%";
            break;
        case "C":
            tela.value = "";
            break;
        case "b":
            tela.value = tela.value.slice(0, tela.value.length -1);
            break;
    };
};

function calc() {
    var eq = tela.value;
    var eqOrd = [];
    for (let i = 0; i < eq.length; i++) {
        if ((eq[i] == "+") || (eq[i] == "-") || (eq[i] == "/") || (eq[i] == "x") || (eq[i] == "%")) {
            eqOrd.push(eq.slice(0, i));
            eqOrd.push(eq[i]);
            eq = eq.slice(i+1, eq.length);
            i = 0;
        };
    };
    eqOrd.push(eq);
    for (let i = 0; i < eqOrd.length; i++){
        if (eqOrd[i] == "x") {
            eqOrd.splice(i+2, 0, (parseInt(eqOrd[i-1])*(parseInt(eqOrd[i+1]))));
            eqOrd.splice(i-1, 3);
            i = 0;
        }
        if (eqOrd[i] == "/") {
            eqOrd.splice(i+2, 0, (parseInt(eqOrd[i-1])/(parseInt(eqOrd[i+1]))));
            eqOrd.splice(i-1, 3);
            i = 0;
        }
        if (eqOrd[i] == "%") {
            eqOrd.splice(i+2, 0, (parseInt(eqOrd[i-1])%(parseInt(eqOrd[i+1]))));
            eqOrd.splice(i-1, 3);
            i = 0;
        }
    };
    for (let i = 0; i < eqOrd.length; i++){
        if (eqOrd[i] == "+") {
            eqOrd.splice(i+2, 0, (parseInt(eqOrd[i-1])+(parseInt(eqOrd[i+1]))));
            eqOrd.splice(i-1, 3);
            i = 0;
        }
        if (eqOrd[i] == "-") {
            eqOrd.splice(i+2, 0, (parseInt(eqOrd[i-1])-(parseInt(eqOrd[i+1]))));
            eqOrd.splice(i-1, 3);
            i = 0;
        };
    };
    resultados.innerHTML = eqOrd;
};