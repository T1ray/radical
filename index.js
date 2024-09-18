function ButtonClick() {
    saveValues();
    calculate();
    changeResult(res);
}

function isNumber(str) {
    var flag = true;
    var nums = ['0','1','2','3','4','5','6','7','8','9'];
    for (var i=0; i<str.length; i++){
        var letter = str[i];
        if (nums.indexOf(letter) === -1) {
            flag = false;
        }
    }
    
    if (str === ''){
        flag = false;
    }

    return flag; 
}

function calculate() {
    var res = null;
    var isNumVal = isNumber(val);
    var isNumAccur = isNumber(accur);
    if (isNumVal && isNumAccur) {
        res = (Math.sqrt(val)).toFixed(accur);
    }
    else {
        res = 'Invalid input format' 
    }
    window.res = res;
}

function changeResult(value) {
    const res = document.getElementsByClassName('result')[0]

    res.textContent = 'Result: ' + value
}
// Функция для получения значений из input и сохранения в переменные
function saveValues() {
    // Получаем значения из полей ввода

    let val = document.getElementById('en').value;
    let accur = document.getElementById('nod').value;

    // Выводим значения в консоль (или выполняем другую логику)
    console.log(typeof val, "Значение val:", val);
    console.log(typeof accur, "Значение accur:", accur);

    // Вы также можете использовать переменные val и accur для дальнейших действий

    window.val = val;
    window.accur = accur;

}

// Назначаем обработчик события для кнопки
window.onload = function() {
    let buttons = document.getElementsByClassName("btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", ButtonClick);
    }
};