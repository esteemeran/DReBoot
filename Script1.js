// JavaScript source code
var health, coins;
var currentState, possibbleMove, reaction;
var walkthroughs = 0;

var defaultSet = function () {
    health = 50;
    coins = 100;
    currentState = -1;
    possibbleMove = { answers: undefined };
    reaction = false;
}
defaultSet();

var achievementCheck = function () {
    var addition = '';
    if (walkthroughs == 3) {
        addition += imageStart + 'im/ach1.jpg' + imageEnd + textStart + '<b>ЛЮБОПЫТСТВО<b> <br /> Есть ли здесь еще что-нибудь? <br /> Кто знает...' + textEnd;
    }
    return addition;
}

/* change to DB request later*/
const FromDB_task =
    [
        {
            descr: "Ваша карта заблокирована из-за подозрительной активности. <br />Чтобы снять блокировку, в течении 500 секунд вам необходимо пройти по ссылке https://***.***. <br />Ваш ЦентроБанк",
            im: true,
            question: true,
            answers: [
     {
         descr: "Срочно пройди по ссылке, возможно в этот момент крадут деньги с карты",
         value: false,
         addhealth: -10,
         addcoins: -60,
         skipNext: 0,
     },
 {
     descr: "Позвони в банк по горячей линии. Номер телефона указан на Вашей карте",
     value: true,
     addhealth: 10,
     addcoins: 20,
     skipNext: 0,
 }
            ]
        }
        ,
{
    descr: "", //Мне нужно попасть к врачу. Единственный врач такой специальности принимает только в поликлинике, на другом конце города. Да и у меня нет много свободного времени. Что же мне делать?
    im: true,
    question: true,
    answers: [
{
    descr: "Отправиться в поликлинику, а там можно будет попробовать попасть на прием",
    value: false,
    addhealth: -15,
    addcoins: -40,
    skipNext: 1,
},
{
    descr: "Не надо ездить к врачу. Сейчас очень опасная эпид обстановка. Само пройдет. ",
    value: false,
    addhealth: -40,
    addcoins: 0,
    skipNext: 1,
},
{
    descr: "Воспользуйся порталом Госуслуги. Запишись на прием дистанционное . В удобное для тебя время. ",
    value: true,
    addhealth: 40,
    addcoins: 10,
    skipNext: 0,
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
    skipNext: 0,
}, {
    descr: "Ой, что-то слишком сложно. Пойду я просто в поликлинику, может все-таки примут так",
    value: false,
    addhealth: -20,
    addcoins: -40,
    skipNext: 0,
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
        var act = possibbleMove.answers[answer];
        coins += act.addcoins;
        health += act.addhealth;
        if (health >= 100) {
            health = 100;
        }
        
        currentState += act.skipNext;
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
        if (health <= 0) {
            finish(form);
            return;
        }
        result = updateBars();
           currentState++;
    }

    if (currentState >= maxStage) {
        finish(form);
        return;
    }

    var tempTask = FromDB_task[currentState];
    if (tempTask.descr != "") {
        result += textStart + tempTask.descr + textEnd;
    }

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
var finish = function (form) {
    var result = updateBars();
    walkthroughs++;
   
    var thouhght = "";
    if (health >= 100) {
        thouhght = 'Вы молодец';
    }
    else {
        if (health >= 50) {
            thouhght = 'Вы молодец, что помогли Салике, <br />но есть еще к чему стремиться';
        }
        if (health < 50) {
            thouhght = 'Похоже, Салика чувствует себя не очень хорошо, <br /> но отрицательный опыт тоже опыт';
        }
    }
    if (coins >= 100) {
        thouhght += '<br /><br /> А ещё вы помогли Салике избежать лишних трат';
    }
    if (coins <= 10) {
        thouhght += '<br /><br /> И Салика ещё осаталась без средств к существованию';
    }

    result += '<br />' + textStart + thouhght + '<br /> Еще раз?' + textEnd;
    result += '<br />' + imButStart + 'Конечно' + imButEnd;
    result += '<button name="Action2" value="об игре" class="button19" onclick="mainPage(this.form)">' + 'В меню' + imButEnd;
    result += achievementCheck();

    form.innerHTML = result;
    defaultSet();
}
var aboutThis = function (form) {
    var result = textStart + "Однопользовательская онлайн - игра. <br/>Главная героиня, Салика, попадает в трудные ситуации, в связи с отсутствием жизненного опыта.";
    result += "<br/>Проведи Салику через все испытания и прокачай свою цифровую грамотность" + textEnd;
    result += '<button name="Action2" value="об игре" class="button19" onclick="mainPage(this.form)">' + 'Назад' + imButEnd;
    form.innerHTML = result;
}
var mainPage = function (form) {
    var result = imageStart + 'im/hello.jpg" alt="Hello there"' + imageEnd;
    result += '<button name="Action2" value="об игре" class="button19" onclick="nextPage(this.form)">' + 'Начать' + imButEnd;
    result += '<button name="Action2" value="об игре" class="button19" onclick="aboutThis(this.form)">' + ' Об игре' + imButEnd;
    form.innerHTML = result;
    defaultSet();
}