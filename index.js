// Функция, выполняемая после надатия кнопки
function ButtonClick() {
    saveValues();
    calculate();
    changeResult(res);
}

/*
Эта функция вычисляет, какой тип данных в полях для ввода, она определяет несколько типов вхтодеых данных:
    0 - нуль 
    1 - отрицательные числа
    2 - положительные числа
    3 - вещественные числа
    4 - комплексные числа
    -1 - все то, что не подошло под нижеперечисленные категории
*/
function TypeNumber(str) {
    console.log(str);
    try {
        str = math.evaluate(str).toString().replace(' ', '');
    } catch (e) {}
    console.log(str);
    var flag = -1;
    var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    //Проверка на 0
    if (str === "0") {
        flag = 0;
        return flag;
    } else if (str[0] === "-") //// Проверка, является ли число отрицательным
    {
        flag = 1;
        for (var i = 1; i < str.length; i++) {
            var letter = str[i];
            if (nums.indexOf(letter) === -1) {
                flag = -1;
            }
        }

    } else // Проверка, является ли число положиетльным
    {
        flag = 2;
        for (var i = 0; i < str.length; i++) {
            var letter = str[i];
            if (nums.indexOf(letter) === -1) {
                flag = -1;
            }
        }

    }
    // Проверка на 
    try {
        // Попытка преобразовать в комплексное число
        let complex = math.complex(str);
        console.log(complex);
        // Проверка, является ли число комплексным
        if (complex.im !== 0) {
            flag = 4;
            return flag;
            // Проверка, является ли число вещественным
        } else if (complex.im === 0 && !Number.isInteger(complex.re)) {
            flag = 3;
        }
    } catch (e) {}
    return flag;
}

// Функция, которая считает ответ, в зависимости от типа входных данных
function calculate() {
    var res = null;
    var TypeNumVal = TypeNumber(val);
    var TypeNumAccur = TypeNumber(accur);

    // Попытка упростить введенные значения
    try {
        val = math.evaluate(val).toString().replace(' ', '');
    } catch (e) {}
    console.log(TypeNumVal, val);

    //Для подходящих типов данных, счет результата
    if (TypeNumVal != -1 && (TypeNumAccur === 2 || TypeNumAccur === 0)) {
        // Для нуля
        if (TypeNumVal === 0) {
            res = "0";

            // Счет результата для положительных типов входных данных
        } else if (TypeNumVal === 2) {
            res = "±" + (Math.sqrt(val)).toFixed(accur);

            // Счет результата для отрицательных типов входных данных
        } else if (TypeNumVal === 1) {
            res = "±" + (Math.sqrt(Math.abs(val))).toFixed(accur) + "i";

            // Счет результата для вещественных типов входных данных
        } else if (TypeNumVal === 3) {
            let num = parseFloat(val);
            if (Math.sign(num) === 1) {
                res = "±" + (Math.sqrt(val)).toFixed(accur);
            } else {
                res = "±" + (Math.sqrt(Math.abs(val))).toFixed(accur) + "i";
            }

            // Счет результата для комплексных типов входных данных
        } else {
            let ComplexNum = math.complex(val);
            let sqrtResult = math.sqrt(ComplexNum);
            let sign = Math.sign(sqrtResult.im);
            if (sign === 1) { sign = "+" } else { sign = "-" }
            res = String(`${sqrtResult.re.toFixed(accur)}${sign}${Math.abs(sqrtResult.im).toFixed(accur)}i`)
        }

        // Вывод в слачае ошибка
    } else {
        res = 'Invalid input format';
    }
    window.res = res;
}

// Функция для отоброжения полученного результата
function changeResult(value) {
    const out = document.getElementById('en');
    out.value = String(value);
    document.getElementById("nod").value = 0;

}
// Функция для получения значений из input и сохранения в переменные
function saveValues() {

    // Получаем значения из полей ввода
    let val = document.getElementById('en').value.replace(",", ".");
    let accur = document.getElementById('nod').value;

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