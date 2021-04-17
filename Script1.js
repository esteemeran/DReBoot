// JavaScript source code
var health = 50;
var coins = 100;
var currentState = -1;
var possibbleMove = { answers: undefined }
var reaction = false;

/* change to DB request */
const FromDB_task =
    [
        {
            descr: "Ваша карта заблокирована из-за подозрительной активности. Чтобы снять блокировку, в течении 500 секунд вам необходимо пройти по ссылке https://***.***. Ваш ЦентроБанк",
            im: true,
            question: true,
            answers: [
     {
         descr: "Срочно пройди по ссылке, возможно в этот момент крадут деньги с карты",
         value: false,
         addhealth: -10,
         addcoins: -20,
     },
 {
     descr: "Позвони в банк по горячей линии. Номер телефона указан на Вашей карте",
     value: true,
     addhealth: 10,
     addcoins: 20,

 }
            ]
        }
        ,
{
    descr: "",
    im: true,
    question: true,
    answers: [
{
    descr: "Отправиться в поликлинику, а там можно будет попробовать попасть на прием",
    value: false,
    addhealth: -40,
    addcoins: -40,

},
{
    descr: "Не надо ездить к врачу. Сейчас очень опасная эпид обстановка. Само пройдет. ",
    value: false,
    addhealth: 40,
    addcoins: 10,

},
{
    descr: "Воспользуйся порталом Госуслуги. Запишись на прием дистанционное . В удобное для тебя время. ",
    value: true,
    addhealth: 40,
    addcoins: 10,
}
    ]
}
        ,
       {
           descr: " Для этого:<br/>1. Зайди на портал Госуслуги и авторизируйся. <br/>2. Выбери в каталоге услугу здравоохранение. <br/>3. Выбери необходимое учреждение, дату и время удобное для тебя",
           im: false,
           question: true,
           answers: [
{
    descr: "Так и сделаю",
    value: true,
    addhealth: 40,
    addcoins: 20,
}]
       }

    ]
;
var maxStage = FromDB_task.length;

var buttonStart = '<input type="button" name="Action1" class="button7" value="';
var buttonMid = '" onclick="nextPage(this.form';
var buttonEnd = ')" /> <br/><br/>';

var imButStart = '<br /><button name="Action1" class="button7" value="s" onclick="nextPage(this.form, null)">';
var imButEnd = '</button> <br/><br/>';

var textStart = '<div class="button24" name="discr">';
var textEnd = '</div><br />';

var imageStart = '<img src="';
var imageEnd = '" /><br/>';

var updateBars = function () {
    var result = '<progress name="health" value="' + health + '" max="100"></progress>';
    result += '<output name="coins">' + coins + ' у.е.</output><br/>';

    return result;
}

var nextPage = function (form, answer) {
    var result = "";
    var imName = "im/";
    if (answer != null) {
        var act = possibbleMove.answers[answer]
        coins += act.addcoins;
        health += act.addhealth;
        if (act.value) {
            imName += "right.jpg";
        } else {
            imName += "wrong.jpg";
        }
    }

    if (reaction) {
        possibbleMove.answers = undefined;
        reaction = false;

        result += imageStart + imName + imageEnd;
        result += imButStart + "Продолжить" + imButEnd;
        form.innerHTML = result;
        return;
    }
    else {
        result = updateBars();
        currentState++;
    }

    if (currentState >= maxStage) {
        result += '<br />' + textStart + 'Вы молодец' + textEnd;
        form.innerHTML = result;
        return;
    }

    var tempTask = FromDB_task[currentState];
    result += textStart + tempTask.descr + textEnd;

    if (FromDB_task[currentState].question) {

        reaction = true;
        if (tempTask.im) {
            result += imageStart + imName + (currentState + 1) + '.jpg' + imageEnd;
        }
        possibbleMove.answers = tempTask.answers;
        for (var i = 0; i < tempTask.answers.length; i++) {
            var temp = tempTask.answers[i];
            result += buttonStart + temp.descr + buttonMid + ", " + i + buttonEnd;
        }
    }
    else {
        result += buttonStart + "Продолжить" + buttonMid + buttonEnd;
        reaction = false;
    }
    form.innerHTML = result;
}
