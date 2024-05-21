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
let transactionDetails = document.querySelector('#transaction-details');
let displayExpense =  document.querySelectorAll('.display-expense');
let arrowLefts = document.querySelector('.arrow-lefts');
let used = document.querySelector('#used')

// let expenseContainer = []
let expenseContainer = JSON.parse(localStorage.getItem('expenseContainer')) || [];


document.addEventListener('DOMContentLoaded', function(){

    if(amt !== null){
    let getIncome = localStorage.getItem('incomeAmount')
    if(getIncome !== null){
    amt.textContent = getIncome;
}
    }

if(epens !== null){
    let getExpense = localStorage.getItem('expenseAmount');
    if(getExpense !== null){
    epens.textContent = getExpense;
    }
}

    if(balanc !== null){
      let getBalance = localStorage.getItem('balanceAmount');
      if(getBalance !== null){
        balanc.textContent = getBalance;
      }
    }

      let getExpenseContainer = localStorage.getItem('expenseContainer');
      if (getExpenseContainer !== null) {
          expenseContainer = JSON.parse(getExpenseContainer);
          transactionUpdate();
      }
});


if(addButton !== null){
addButton.addEventListener("click", function () {
  chooseType.style.display = "block";
  addDiv.style.display = "none";
});
}

if(addIncomeBtn !== null){
addIncomeBtn.addEventListener("click", function () {
  addIncome.style.display = "block";
  chooseType.style.display = "none";
  // console.log('yes')
});
}

if(addExpenseBtn !== null){
addExpenseBtn.addEventListener("click", function () {
  addExpense.style.display = "block";
  chooseType.style.display = "none";

  now()
});
}

if(categoryArrow!== null){
categoryArrow.addEventListener("click", function () {
categoryContainer.style.display = "block";
addExpense.style.display = "none";
});
}

if(categoryDiv!== null){
categoryDiv.forEach(category => {
    category.addEventListener("click", function(){
    categoryValue.innerHTML = category.textContent;
    console.log(category.textContent);
    categoryValue.style.display = "block";
})

});
}


if(close !== null){
close.addEventListener("click", function () {
  addIncome.style.display = "none";
  addDiv.style.display = "block";
  console.log("yes");
});
}

if(closed!== null){
closed.addEventListener("click", function () {
  addExpense.style.display = "none";
  addDiv.style.display = "block";
  console.log("yes");
});
}


if(arrowLeft !== null){
arrowLeft.addEventListener("click", function () {
  categoryContainer.style.display = "none";
  addExpense.style.display = "block";
});

}

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


if(submitIncome !== null){
submitIncome.addEventListener("click", function () {
    let total = parseInt(amt.textContent, 10) + parseInt(incomeAmount.value, 10);
    localStorage.setItem('incomeAmount', total);

  amt.textContent = `${total}`;
  balanc.textContent = `${total - parseInt(epens.textContent, 10)}`;
  localStorage.setItem('balanceAmount', balanc.textContent);
});
}

if(submitExpense !== null){
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
}

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
            <h4>${obj.date}</h4>
            
        </div>
        </div>

        <h4>$${obj.amount}</h4>`

        li.addEventListener('click', function(){
            const div = document.createElement('div');
    div.classList.add('transaction-detailed');
    div.innerHTML = `
    
    <h3 id="transaction-details-title">Expense trasaction Details</h3> <br>

    <h4 id="description-title">${obj.description}</h4>
    <h2 id="amount-title">$ ${obj.amount}</h2> <br>

    <hr>
    <br>
    <p id="transaction-id">Transaction Category: ${obj.category}</p>

    <div id="transaction-datevalue">
        <p id="transaction-id">Transaction Date</p>
        <p id="date-value">${obj.date}</p>
    </div>

    <div id="modify">
        <button id="edit"><span class="material-symbols-outlined">edit_square</span>Modify Expense</button>
        <button id="delete"><span class="material-symbols-outlined">delete</span>Delete</button>
    </div>
    `
    transactionDetails.appendChild(div)
            transactionDetails.style.display = 'block'
            
        })
        transactionList.appendChild(li)
        localStorage.setItem('li', transactionList.outerHTML);
    }) 
}


if(arrowLefts !== null){
arrowLefts.addEventListener('click', function() {
    transactionDetails.style.display = 'none'
    // li.style.display = 'block';
})
}
 
if(document.getElementById('today-button') !== null){
  document.getElementById('today-button').addEventListener('click', function() {
    filterTransactions('today');
});
}

if(document.getElementById('week-button') !== null){
document.getElementById('week-button').addEventListener('click', function() {
    filterTransactions('week');
});
}

if(document.getElementById('month-button')!== null){
document.getElementById('month-button').addEventListener('click', function() {
    filterTransactions('month');
});
}

if(document.getElementById('year-button')!== null){
document.getElementById('year-button').addEventListener('click', function() {
  filterTransactions('year');
});
}

//filter transactions
function filterTransactions(period) {
    const now = new Date();
    let filteredTransactions = expenseContainer.expenseObject;
    let dateRangeText = '';

    if (period === 'today') {
        filteredTransactions = expenseContainer.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.toDateString() === now.toDateString();
        });
        dateRangeText = `${now.toDateString()}`;
    } else if (period === 'week') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        const endOfWeek = new Date(now);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week
        endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

        filteredTransactions = expenseContainer.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfWeek && transactionDate <= now; // Ensures no future dates
        });

        const displayEndOfWeek = endOfWeek > now ? now : endOfWeek;
        dateRangeText = `${startOfWeek.toDateString()} - ${displayEndOfWeek.toDateString()}`;
    } else if (period === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month

        filteredTransactions = expenseContainer.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfMonth && transactionDate <= now; // Ensures no future dates
        });

        const displayEndOfMonth = endOfMonth > now ? now : endOfMonth;
        dateRangeText = `${startOfMonth.toDateString()} - ${displayEndOfMonth.toDateString()}`;
    } else if (period === 'year') {
    // Filter transactions for the current year
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 0);
    filteredTransactions = expenseContainer.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startOfYear && transactionDate <= endOfYear;
    });
    dateRangeText = `Year's Range: ${startOfYear.toDateString()} - ${endOfYear.toDateString()}`;
}

    displayTransactions(filteredTransactions);
    displaySummary(filteredTransactions);
    updateDateRange(dateRangeText);
}

function updateDateRange(text) {
    const dateRangeDiv = document.getElementById('today');
    dateRangeDiv.textContent = text;
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
                <h4>${transaction.date}</h4>
            </div>
        </div>
        <h4>$${transaction.amount}</h4>`;

        transactionItem.addEventListener('click', function(){
            const div = document.createElement('div');
    div.classList.add('transaction-detailed');
    div.innerHTML = `
    
    <h3 id="transaction-details-title">Expense trasaction Details</h3> <br>

    <h4 id="description-title">${obj.description}</h4>
    <h2 id="amount-title">$ ${obj.amount}</h2> <br>

    <hr>
    <br>
    <p id="transaction-id">Transaction Category: ${obj.category}</p>

    <div id="transaction-datevalue">
        <p id="transaction-id">Transaction Date</p>
        <p id="date-value">${obj.date}</p>
    </div>

    <div id="modify">
        <button id="edit"><span class="material-symbols-outlined">edit_square</span>Modify Expense</button>
        <button id="delete"><span class="material-symbols-outlined">delete</span>Delete</button>
    </div>
    `
    transactionDetails.appendChild(div)
            transactionDetails.style.display = 'block'
            
        })

        transactionListDiv.appendChild(transactionItem);
    });
}

// Get the date input element
const calendarInput = document.getElementById('calendar-input');

if(calendarInput !== null){
// Add event listener for date input change
calendarInput.addEventListener('change', function() {
    // Get the selected date value
    const selectedDate = new Date(this.value);
    // Filter transactions based on the selected date
    const filteredTransactions = expenseContainer.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.toDateString() === selectedDate.toDateString();
    });
    // Display the filtered transactions
    displayTransactions(filteredTransactions);
});
}



if(document.querySelector('#search-input') !== null){
// Add event listener for search input
document.querySelector('#search-input').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const filteredTransactions = expenseContainer.filter(transaction => {
        return transaction.category.toLowerCase().includes(query) || 
               transaction.description.toLowerCase().includes(query);
    });
    displayTransactions(filteredTransactions);
});
}

//Summary

if(document.querySelector('#calender-inpu')!== null){
document.querySelector('#calender-inpu').addEventListener('click', function() {
used.style.display = 'flex';
})
}

// Get the start and end date input elements
const calendarStartInput = document.getElementById('calendar-start');
const calendarEndInput = document.getElementById('calendar-end');

// Add event listeners for date input change
calendarStartInput.addEventListener('change', filterTransactionsByDateRange);
calendarEndInput.addEventListener('change', filterTransactionsByDateRange);

function filterTransactionsByDateRange() {
    // Get the start and end dates from the input elements
    const startDate = new Date(calendarStartInput.value);
    const endDate = new Date(calendarEndInput.value);

    // Filter transactions based on the date range
    const filteredTransactions = expenseContainer.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Display the filtered transactions
    displayTransactions(filteredTransactions);

    // Optionally, update the date range text
    updateDateRange(`Range: ${startDate.toDateString()} - ${endDate.toDateString()}`);
}

let summaryDiv = document.getElementById('summaryDiv');

// function displaySummary(transactions) {
//   // Reset summary div
//   summaryDiv.innerHTML = '';

//   // Retrieve total income from localStorage
//   let totalIncome = parseInt(localStorage.getItem('incomeAmount'), 10) || 0;
//   let totalExpenses = transactions.reduce((total, transaction) => total + parseInt(transaction.amount, 10), 0);

//   // Display total income and expenses
//   const incomeExpenseDiv = document.createElement('div');
//   incomeExpenseDiv.innerHTML = `
//       <h2>Total Income: $${totalIncome}</h2>
//       <h2>Total Expenses: $${totalExpenses}</h2>
//   `;
//   summaryDiv.appendChild(incomeExpenseDiv);

//   // Calculate total transactions and expenditure by category
//   const categories = {};
//   transactions.forEach(transaction => {
//       const category = transaction.category;
//       categories[category] = (categories[category] || 0) + parseInt(transaction.amount, 10);
//   });

//   // Display expenditure by category
//   Object.keys(categories).forEach(category => {
//       const expenditure = categories[category];
//       const percentage = (expenditure / totalIncome) * 100;

//       // Create colored div representing the percentage of expenditure
//       const categoryDiv = document.createElement('div');
//       categoryDiv.classList.add('category-summary');
//       categoryDiv.innerHTML = `
//           <h3>${category}</h3>
//           <div class="progress-bar" style="width: ${percentage}%; background-color: blue;"></div>
//           <p>${percentage.toFixed(2)}%</p>
//       `;
//       summaryDiv.appendChild(categoryDiv);
//   });
// }
function displaySummary(transactions) {
  // Reset summary div
  summaryDiv.innerHTML = '';

  // Retrieve total income from localStorage
  let totalIncome = parseInt(localStorage.getItem('incomeAmount'), 10) || 0;
  let totalExpenses = transactions.reduce((total, transaction) => total + parseInt(transaction.amount, 10), 0);

  // Display total income and expenses
  const incomeExpenseDiv = document.createElement('div');
  incomeExpenseDiv.innerHTML = `
      <h2>Total Income: $${totalIncome}</h2>
      <h2>Total Expenses: $${totalExpenses}</h2>
  `;
  summaryDiv.appendChild(incomeExpenseDiv);

  // Calculate total transactions and expenditure by category
  const categories = {};
  transactions.forEach(transaction => {
      const category = transaction.category;
      categories[category] = (categories[category] || 0) + parseInt(transaction.amount, 10);
  });

  // Display expenditure by category
  Object.keys(categories).forEach(category => {
      const expenditure = categories[category];
      const percentage = totalIncome > 0 ? (expenditure / totalIncome) * 100 : 0;

      // Create colored div representing the percentage of expenditure
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category-summary');
      categoryDiv.innerHTML = `
          <h3>${category}</h3>
          <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${percentage}%;"></div>
          </div>
          <p>${percentage.toFixed(2)}% ($${expenditure})</p>
      `;
      summaryDiv.appendChild(categoryDiv);
  });
}








