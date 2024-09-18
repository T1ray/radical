function ButtonClick() {
    saveValues();
    calculate();
    changeResult(val);
}

function calculate() {
    console.log('hello world!');
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
    // console.log("Значение val:", val);
    // console.log("Значение accur:", accur);

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