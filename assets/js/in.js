//Algorithm

// Retrieve username from localStorage
const username = localStorage.getItem("username");
// Display welcome message
const welcomeMessage = document.querySelector("#welcome");
welcomeMessage.textContent = `Welcome ${username}!`;

//Variables

let addTransactions = document.querySelector("#addtransactions");
let addDiv = document.querySelector("#add-div");
let addButton = document.querySelector("#add-button");
let chooseType = document.querySelector("#choose-type");
let addIncomeBtn = document.querySelector("#add-income-button");
let addIncome = document.querySelector("#add-income");
let addExpenseBtn = document.querySelector("#add-expense-button");
let addExpense = document.querySelector("#add-expense");
let close = document.querySelector(".close");
let closed = document.querySelector(".closed");
let submitIncome = document.querySelector("#submit-income");
let incomeAmount = document.querySelector("#income-amount");
let totalIncomes = document.querySelector("#total-income");
let totalExpenses = document.querySelector("#total-expense");
let balance = document.querySelector("#balance");
let expenseAmount = document.querySelector("#expense-amount");
let submitExpense = document.querySelector("#submit-expense");
let description = document.querySelector("#description");
let date = document.querySelector("#date");
let transactionList = document.querySelector('#transaction-list');
let categoryArrow = document.querySelector('.category-arrow');
let categoryContainer = document.querySelector('#category-container');
let arrowLeft = document.querySelector('.arrow-left');
let categoryValue = document.querySelector('#category-value');
let categoryDiv = document.querySelectorAll('.category-divs');
let time =  document.querySelector('#time')
let amt = document.querySelector('#amt');
let balanc = document.querySelector('#balanc');
let epens = document.querySelector('#epens');

// let expenseContainer = []
let expenseContainer = JSON.parse(localStorage.getItem('expenseContainer')) || [];


document.addEventListener('DOMContentLoaded', function(){
    let getIncome = localStorage.getItem('incomeAmount')
    if(getIncome !== null){
    amt.textContent = getIncome;
}

    let getExpense = localStorage.getItem('expenseAmount');
    if(getExpense !== null){
    epens.textContent = getExpense;
    }

      let getBalance = localStorage.getItem('balanceAmount');
      if(getBalance !== null){
        balanc.textContent = getBalance;
      }

      let getExpenseContainer = localStorage.getItem('li');
      if(getExpenseContainer !== null){
        transactionList.innerHTML = getExpenseContainer;
      }
})

addButton.addEventListener("click", function () {
  chooseType.style.display = "block";
  addDiv.style.display = "none";
});

addIncomeBtn.addEventListener("click", function () {
  addIncome.style.display = "block";
  chooseType.style.display = "none";
  // console.log('yes')
});

addExpenseBtn.addEventListener("click", function () {
  addExpense.style.display = "block";
  chooseType.style.display = "none";

  now()
});

categoryArrow.addEventListener("click", function () {
categoryContainer.style.display = "block";
addExpense.style.display = "none";
});

categoryDiv.forEach(category => {
    category.addEventListener("click", function(){
    categoryValue.innerHTML = category.textContent;
    console.log(category.textContent);
    categoryValue.style.display = "block";
})

});

close.addEventListener("click", function () {
  addIncome.style.display = "none";
  addDiv.style.display = "block";
  console.log("yes");
});

closed.addEventListener("click", function () {
  addExpense.style.display = "none";
  addDiv.style.display = "block";
  console.log("yes");
});

arrowLeft.addEventListener("click", function () {
  categoryContainer.style.display = "none";
  addExpense.style.display = "block";
});

function now () {
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let currentTime = `${hours}:${minutes}:${seconds}`;
console.log(currentTime);
time.value= currentTime;
}

let totalIncome = 0;
let totalExpense = 0;


console.log(amt);

submitIncome.addEventListener("click", function () {
    let total = parseInt(amt.textContent, 10) + parseInt(incomeAmount.value, 10);
    localStorage.setItem('incomeAmount', total);

  amt.textContent = `${total}`;
  balanc.textContent = `${total - parseInt(epens.textContent, 10)}`;
  localStorage.setItem('balanceAmount', balanc.textContent);
});

submitExpense.addEventListener("click", function () {
  totalExpense = expenseAmount.value;

let total = parseInt(epens.textContent, 10) + parseInt(totalExpense, 10);
localStorage.setItem('expenseAmount', total);

epens.textContent = `${total}`;

  balanc.textContent = `${parseInt(amt.textContent, 10) - parseInt(epens.textContent, 10)}`;
  localStorage.setItem('balanceAmount', balanc.textContent);

  let expenseObject = {
    amount:expenseAmount.value,
    description:description.value,
    time:time.value,
    date: date.value,
    category: categoryValue.textContent
}

expenseContainer.push(expenseObject);
localStorage.setItem('expenseContainer', JSON.stringify(expenseContainer));

transactionList.innerHTML = ''
transactionUpdate()

  console.log(expenseContainer)
});

function transactionUpdate(){
    expenseContainer.forEach(obj => {
        const li = document.createElement('li');
        li.classList.add('display-expense');
        li.innerHTML =  `
        <div id="image-desc">
        <h1>${obj.category}</h1>
        <div>
            <h4>${obj.description} </h4>
            <h3>${obj.time}</h3>
        </div>
        </div>

        <h4>$${obj.amount}</h4>`

        
        transactionList.appendChild(li)
        localStorage.setItem('li', transactionList.outerHTML);
    })  
}
  // Additional functionality for filtering and searching
  document.getElementById('today-button').addEventListener('click', function() {
    filterTransactions('today');
});

document.getElementById('week-button').addEventListener('click', function() {
    filterTransactions('week');
});

document.getElementById('month-button').addEventListener('click', function() {
    filterTransactions('month');
});

function filterTransactions(period) {
    const now = new Date();
    let filteredTransactions = expenseContainer.expenseObject;

    if (period === 'today') {   
        filteredTransactions = expenseContainer.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.toDateString() === now.toDateString();
        });

} else if (period === 'week') {
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // End of the week

    filteredTransactions = expenseContainer.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
    });
    } else if (period === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filteredTransactions = expenseContainer.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfMonth && transactionDate <= now;
        });
    }

    displayTransactions(filteredTransactions);
}

function displayTransactions(transactions) {
    const transactionListDiv = document.getElementById('transaction-list');
    transactionListDiv.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('display-expense');
        transactionItem.innerHTML = `
        <div id="image-desc">
            <h1>${transaction.category}</h1>
            <div>
                <h4>${transaction.description}</h4>
                <h3>${transaction.time}</h3>
            </div>
        </div>
        <h4>$${transaction.amount}</h4>`;

        transactionListDiv.appendChild(transactionItem);
    });
}





