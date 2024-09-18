const button = document.getElementsByClassName('.btn');
//button.addEventListner("click", PasreValue);

function PasreValue(val, accur){
    var val = document.getElementsByClassName('.en').value;
    var accur = document.getElementsByClassName('.nod').value;

    console.log(val,accur,button);
}

window.onload = function() {
    button.addEventListener("click", PasreValue);
};