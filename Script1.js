// JavaScript source code
var health = 50;
var coins = 100;
var currentState = -1;

/* change to DB request */
var FromDB_task =
    [
        {
            descr: "Ваша карта заблокирована из-за подозрительной активности. Чтобы снять блокировку, в течении 500 секунд вам необходимо пройти по ссылке https://***.***. Ваш ЦентроБанк",
            question: true,
            answers: [
            {
                descr: "Перейти по ссылке из сообщения",
                value: false
            },
        {
            descr: "Проверить состояния счетов через официальный сайт банка",
            value: true
        }
            ]
        }
        ,
        {
            descr: "Правильно надо: <br/> 1) Зайти на официальный сайт <br/> 2) Зайти в личный кабинет <br/> 3) Проверить состояние счетов, используя официальные источние",
            question: false,
            answers: []
        },

    ]
;

var buttonStart = '<input type="button" name="Action1" value="';
var buttonMid = '" onclick="nextPage(this.form';
var buttonEnd = ')" /> <br/>';

var textStart = '<div name="discr">';
var textEnd = '</div>';

var updateBars = function () {
    var result = '<progress name="health" value="' + health + '" max="100"></progress>';
    result += '<output name="coins">' + coins + '</output>';

    return result;
}

var nextPage = function (form, answer) {
    var result = updateBars();
    currentState++;

    var tempTask = FromDB_task[currentState];
    result += textStart + tempTask.descr + textEnd;
    for (var i = 0; i < tempTask.answers.length; i++) {
        var temp = tempTask.answers[i];
        result += buttonStart + temp.descr + buttonMid + ", " + temp.value + buttonEnd;
    }

    if (answer = null) result = textStart + "Что-то пошло не так" + textEnd;
    if (!answer) { coins -= 100; }

    form.innerHTML = result;
}
