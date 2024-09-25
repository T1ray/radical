function ButtonClick() {
    saveValues();
    calculate();
    changeResult(res);
}

function TypeNumber(str) {
    console.log(math.typeOf(str));
    var flag = -1;
    var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (str === "0") //zero
    {
        flag = 0;
        return flag;
    } else if (str[0] === "-") //negative number
    {
        flag = 1;
        for (var i = 1; i < str.length; i++) {
            var letter = str[i];
            if (nums.indexOf(letter) === -1) {
                flag = -1;
            }
        }
    } else //positive numbers
    {
        flag = 2;
        for (var i = 0; i < str.length; i++) {
            var letter = str[i];
            if (nums.indexOf(letter) === -1) {
                flag = -1;
            }
        }
    }
    if (str === '' || isNaN(str)) {
        flag = -1;
    }
    try {
        // Попытка преобразовать в комплексное число
        let complex = math.complex(str);
        console.log(complex);
        // Проверка, является ли число комплексным
        if (complex.im !== 0) {
            flag = 4;
        }
        else if (complex.im === 0 && !Number.isInteger(complex.re)) {
            flag = 3;
        }
    } catch (e) {}

    return flag;
}

function calculate() {
    var res = null;
    var TypeNumVal = TypeNumber(val);
    var TypeNumAccur = TypeNumber(accur);
    console.log(TypeNumVal, val);
    console.log(TypeNumAccur, accur);
    if (TypeNumVal != -1 && (TypeNumAccur === 2 || TypeNumAccur === 0)) {
        if (TypeNumVal === 0) {
            res = "0";
        } else if (TypeNumVal === 2) {
            res = "±" + (Math.sqrt(val)).toFixed(accur);
        } else if (TypeNumVal === 1) {
            res = "±" + (Math.sqrt(Math.abs(val))).toFixed(accur) + "i";
        } else if (TypeNumVal === 3) {
            let num = parseFloat(val);
            if (Math.sign(num) === 1) {
                res = "±" + (Math.sqrt(val)).toFixed(accur);
            } else {
                res = "±" + (Math.sqrt(Math.abs(val))).toFixed(accur) + "i";
            }
        } else {
            let ComplexNum = math.complex(val);
            let sqrtResult = math.sqrt(ComplexNum);
            let sign = Math.sign(sqrtResult.im);
            if (sign===1) {sign = "+"}
            else {sign = "-"}
            res = String(`${sqrtResult.re.toFixed(accur)}${sign}${Math.abs(sqrtResult.im).toFixed(accur)}i`)
        }

    } else {
        res = 'Invalid input format';
    }
    window.res = res;
}

function changeResult(value) {
    console.log("nice");
    const out = document.getElementById('en');
    out.value = String(value);
    document.getElementById("nod").value = 0;

}
// Функция для получения значений из input и сохранения в переменные
function saveValues() {

    // Получаем значения из полей ввода
    let val = document.getElementById('en').value.replace(",",".");
    let accur = document.getElementById('nod').value;

    // Выводим значения в консоль (или выполняем другую логику)
    //console.log(typeof val, "Значение val:", val);
    //console.log(typeof accur, "Значение accur:", accur);
    // Добавляем возможность использовать val и accur вне функции
    window.val = val;
    window.accur = accur;
}

// Назначаем обработчик события для кнопки
window.onload = function() {
    let buttons = document.getElementsByClassName("btn");
    document.getElementById("nod").value = 0;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", ButtonClick);
    }
};