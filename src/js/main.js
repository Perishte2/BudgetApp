let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;
//Second Part
startBtn.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt("Ваш бюджет на месяц?", '');

    while (isNaN(money) || money == '' || money == null) {
        money = prompt("Ваш бюджет?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

});

expensesBtn.addEventListener('click', function(){
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    
            console.log ("done");
    
            appData.expenses[a] = b;
            sum += +b;
        } else {                            
            console.log ("bad result");
            i--;
        }
    
    };  
    expensesValue.textContent = sum;


});

optionalExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});


countBtn.addEventListener('click', function() {

    if(appData.budget != undefined){
        appData.moneyPerDay = (appData.budget / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;

            if(appData.moneyPerDay < 100) {
                levelValue.textContent = "Минимальный уровень достатка";
            } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ){
                levelValue.textContent = "Средний уровень достатка";
            } else if(appData.moneyPerDay > 2000 ) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Что то пошло не так";
            }
    }else{
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
    

});

incomeItem.addEventListener('input', function(){
   let items = incomeItem.value;
   appData.income = items.split(', ');
   incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('input', function() {
     if(appData.savings == true){
         appData.savings = false;
     } else {
         appData.savings = true;
     }
});


sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});




  //first part
let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false, 
    chooseExpenses: function() {    //methods of object
        for (let i = 0; i < 2; i++) {
            let a = prompt ("Введите обязательную статью расходов в этом месяце", ""),
                b = prompt ("Во сколько обойдется?", "");
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
        
                console.log ("done");
        
                appData.expenses[a] = b;
            } else {                            
                console.log ("bad result");
                i--;
            }
        
        };  
    },
    detectDayBudget: function() {    //methods of object
        
        alert("Ежедневный бюджет : " + appData.moneyPerDay);
    },
    detectLevel: function() {    //methods of object
        
    },
    checkSavings: function() {    //methods of object
        if(appData.savings == true ) {
            let save = +prompt("Какова сумма накопления?");
                percent = +prompt("Под какой процент?");
    
            appData.monthIncome = save/100/12*percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
    
        }
    },
    chooseIncome: function() {
        
     
       let  items = prompt("Что принесет дополнительный доход? (Перечислите через запятую) " , '');
       if (typeof(items) != "string" || items == "" || typeof(items) == null) {  //to check if array is not empty or did not anyone pressed cancel
        // or didnt anyone pressed any numbers 
           console.log("Вы ввели некорректные данные или вовсе их не ввели");
       }else{
        appData.income = items.split(', ');
        appData.income.push(prompt("А может что то еще? "));
        appData.income.sort();
        
     }
     
     appData.income.forEach(function(item, i) {   //to show all methods of salary
         alert("Способы доп. заработка: " + (i+1) + " - " + item);

     })
    },
    showWholeObject: function() {  //to show all keys and meanings of object appData
        for(let key in appData) {
            alert("Наша программа включает в себя данные: " + key + "  имеет значение  " + appData[key]);
        }
    }
   

};




