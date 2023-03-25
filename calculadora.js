document.onkeyup = function(e) {
    switch (e.key) {
        case "Enter":
            calc();
            break;
        case "Delete":
            tela.value = "";
            resultados.innerHTML = "";
            break;
        case "Control":
            tela.value = resultados.textContent;
    };
};
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
            resultados.innerHTML = "";
            break;
        case "b":
            tela.value = tela.value.slice(0, tela.value.length -1);
            break;
        case "e":
            tela.value += "[]^[]";
            break;
        case "r":
            tela.value += "[]√[]";
            break;
    };
};

function calc() {
    var eq = tela.value.trim();
    var eqOrd = [];
    var cnt = false;
    for (let i = 0; i <= eq.length; i++) {
        if ((eq[i] == "+") || (eq[i] == "-") || (eq[i] == "/") || (eq[i] == "x") || (eq[i] == "%") || (eq[i] == "^") || (eq[i] == "√") || (eq[i] == "(") || (eq[i] == ")")) {
                if ((eq[i] == ")") && (i+1 == eq.length)) { 
                    cnt == true; 
                };
                if (!(eq[i] == "(")) { 
                    eqOrd.push(eq.slice(0, i));
                };
                eqOrd.push(eq[i]);
                eq = eq.slice(i+1, eq.length);
                i = -1;          
        };
    };

    if (!cnt) { eqOrd.push(eq); } 

    var j = 0
    while (j < eqOrd.length) {
        if (eqOrd[j] == "") {
            eqOrd.splice(j, 1);
        } else {
            ++j;
        }
    }
    var info = 0;
    var memoryEq, memoryRes;
    for (let i = 0; i <= eqOrd.length; i++) {
        if (eqOrd[i] == "(") {
            info = i;
        }
        else if (eqOrd[i] == ")") {
            memoryEq = eqOrd.slice(info + 1, i)
            memoryRes = operacao(memoryEq, eqOrd, true);
            eqOrd.splice(i+1, 0, String(memoryRes[0]));
            eqOrd = (eqOrd.slice(0, info)).concat(eqOrd.slice(i+1, eqOrd.length));
            i = 0;
        };
    };
    eqOrd = operacao(eqOrd)
    if (String(eqOrd) == "NaN") {
        eqOrd = "Erro";
    };
    resultados.innerHTML = eqOrd;
};

function operacao(mem) {
    for (let i = 0; i < mem.length; i++) {
        if (mem[i] == "^") {
            mem[i-1] = mem[i-1].slice(1, mem[i-1].length-1);
            mem[i+1] = mem[i+1].slice(1, mem[i+1].length-1);
            mem.splice(i+2, 0, (parseInt(mem[i-1])**(parseInt(mem[i+1]))));
            mem.splice(i-1, 3);
            i=0;
        }
        else if (mem[i] == "√") {
            mem[i-1] = mem[i-1].slice(1, mem[i-1].length-1);
            mem[i+1] = mem[i+1].slice(1, mem[i+1].length-1);
            mem.splice(i+2, 0, Math.pow(parseInt(mem[i+1]), 1/(parseInt(mem[i-1])) ));
            mem.splice(i-1, 3);
            i=0;
        };
        
    };
    for (let i = 0; i < mem.length; i++){
        if (mem[i] == "x") {
            mem.splice(i+2, 0, (parseInt(mem[i-1])*(parseInt(mem[i+1]))));
            mem.splice(i-1, 3);
            i = 0;
        }
        else if (mem[i] == "/") {
            mem.splice(i+2, 0, (parseInt(mem[i-1])/(parseInt(mem[i+1]))));
            mem.splice(i-1, 3);
            i = 0;
        }
        else if (mem[i] == "%") {
            mem.splice(i+2, 0, (parseInt(mem[i-1])%(parseInt(mem[i+1]))));
            mem.splice(i-1, 3);
            i = 0;
        }
    };
    for (let i = 0; i < mem.length; i++){
        if (mem[i] == "+") {
            mem.splice(i+2, 0, (parseInt(mem[i-1])+(parseInt(mem[i+1]))));
            mem.splice(i-1, 3);
            i = 0;
        }
        else if (mem[i] == "-") {
            mem.splice(i+2, 0, (parseInt(mem[i-1])-(parseInt(mem[i+1]))));
            mem.splice(i-1, 3);
            i = 0;
        };
    };
    return mem;
};
