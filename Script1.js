// JavaScript source code
var health = 100;
var coins = 100;
var currentState = 0;

var FromDB_task = 
{
    descr: "Ваша карта заблокирована из-за подозрительной активности. Чтобы снять блокировку, в течении 500 секунд вам необходимо пройти по ссылке https://***.***. Ваш ЦентроБанк",
    question: true,
answers: [
    {
        descr: "Перейти по ссылке из сообщения",
value: false},
{
    descr: "Проверить состояния счетов через официальный сайт банка",
    value: true
    }
]
}

var buttonStart = '<input type="button" name="Action1" value="';
var buttonMid = '" onclick="nextPage(this.form';
var buttonEnd = ')" />';

var textStart = '<div name="discr">';
var textEnd = '</div>';

var nextPage = function (form, answer) {
    var result = "";
    if (currentState == 0)
    {
        currentState++;
        result += textStart + FromDB_task.descr + textEnd;
        for (var i = 0; i<FromDB_task.answers.length;i++)
        {
            var temp = FromDB_task.answers[i];
            result += buttonStart + temp.descr + buttonMid + ", " + temp.value + buttonEnd;
       }
        form.innerHTML = result;
    }
}