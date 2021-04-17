// JavaScript source code
var health = 100;
var coins = 100;
var currentState = 0;

var button = '<input type="button" name="Action1" value="Action1" onclick="nextPage(this.form)" />';

var nextPage = function (form) {
    var result = "";
    if (currentState == 0)
    {
        currentState++;
        result += button;
        result += button;



    }
    form.innerHTML = result;
}

