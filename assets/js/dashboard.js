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
let transactionList = document.querySelector("#transaction-list");
let categoryArrow = document.querySelector(".category-arrow");
let categoryContainer = document.querySelector("#category-container");
let arrowLeft = document.querySelector(".arrow-left");
let categoryValue = document.querySelector("#category-value");
let categoryDiv = document.querySelectorAll(".category-divs");
let time = document.querySelector("#time");
let amt = document.querySelector("#amt");
let balanc = document.querySelector("#balanc");
let epens = document.querySelector("#epens");
let transactionDetails = document.querySelector("#transaction-details");
let displayExpense = document.querySelectorAll(".display-expense");
let arrowLefts = document.querySelector(".arrow-lefts");
let used = document.querySelector("#used");
let incomeDate = document.querySelector("#income-date");
let setting = document.querySelector("#setting");
let settings = document.querySelector("#settings");
let dark = document.querySelector("#dark");
let light = document.querySelector("#light");
let rightSide = document.querySelector("#right-side");
let currency = document.querySelectorAll('#currency')
let arrowSetting = document.querySelector('.arrow-setting')
const selectElement = document.querySelector('#dark-light');
const currencySelector = document.querySelector('#currency-selector');
const current = document.querySelector('.current')
// Function To Display Welcome Message

const username = localStorage.getItem("username"); // Retrieve username from localStorage

const welcomeMessage = document.querySelector("#welcome");
welcomeMessage.textContent = `Welcome ${username}!`; // Display welcome message


// let expenseContainer = JSON.parse(localStorage.getItem("expenseContainer")) || []; // Retrieve data in the key expense Container from local storage and return null if no data is found

document.addEventListener("DOMContentLoaded", function () {
    if (amt !== null) {
        let getIncome = localStorage.getItem("incomeAmount"); //Retrieve income total inside the incomeAmount key
        if (getIncome !== null) {
            amt.textContent = getIncome; //displays new income
        }
    }

    if (epens !== null) {
        let getExpense = localStorage.getItem("expenseAmount");
        if (getExpense !== null) {
            epens.textContent = getExpense;
        }
    }

    if (balanc !== null) {
        let getBalance = localStorage.getItem("balanceAmount");
        if (getBalance !== null) {
            balanc.textContent = getBalance;
        }
    }

    let getExpenseContainer = localStorage.getItem("expenseContainer");
    if (getExpenseContainer !== null) { // null is so it doesn't throw error if there is nothing inside
        expenseContainer = JSON.parse(getExpenseContainer);
        transactionUpdate();
    }

    if (currency !== null) {
    let getCurrencyValue = localStorage.getItem('currencyValue');
    if (getCurrencyValue !== null) { 
        currency.forEach(currencyPair => {
            currencyPair.textContent = getCurrencyValue
         } )
    }
}
});

if (addButton !== null) { //if it does not see the button on the page, it will not run because we are usin one js
    addButton.addEventListener("click", function () {
        chooseType.style.display = "block";
        addDiv.style.display = "none";
    });
}



if (addIncomeBtn !== null) {
    addIncomeBtn.addEventListener("click", function () {
        addIncome.style.display = "block";
        chooseType.style.display = "none";
        // console.log('yes')
    });
}


function now() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let currentTime = `${hours}:${minutes}:${seconds}`;
    // console.log(currentTime);
    time.value = currentTime;
}

if (addExpenseBtn !== null) {
    addExpenseBtn.addEventListener("click", function () {
        addExpense.style.display = "block";
        chooseType.style.display = "none";

        now();
    });
}

if (categoryArrow !== null) {
    categoryArrow.addEventListener("click", function () {
        categoryContainer.style.display = "block";
        addExpense.style.display = "none";
    });
}

if (categoryDiv !== null) {
    categoryDiv.forEach((category) => {
        category.addEventListener("click", function () {
            categoryValue.innerHTML = category.textContent;
            // console.log(category.textContent);
            categoryValue.style.display = "block";
        });
    });
}

if (close !== null) {
    close.addEventListener("click", function () {
        addIncome.style.display = "none";
        addDiv.style.display = "block";
        //   console.log("yes");
    });
}

if (closed !== null) {
    closed.addEventListener("click", function () {
        addExpense.style.display = "none";
        addDiv.style.display = "block";
        //   console.log("yes");
    });
}

if (arrowLeft !== null) {
    arrowLeft.addEventListener("click", function () {
        categoryContainer.style.display = "none";
        addExpense.style.display = "block";
    });
}

if (arrowLefts !== null) {
    arrowLefts.addEventListener("click", function () {
        transactionDetails.style.display = "none";
        transactionDetails.innerHTML = "";
        // li.style.display = 'block';
    });
}

let incomeArray = [];

if (submitIncome !== null) {
    submitIncome.addEventListener("click", function () {
        let total = parseInt(amt.textContent, 10) + parseInt(incomeAmount.value, 10);
        localStorage.setItem("incomeAmount", total);

        amt.textContent = `${total}`;
        balanc.textContent = `${total - parseInt(epens.textContent, 10)}`;
        localStorage.setItem("balanceAmount", balanc.textContent);

        let incomeObject = {
            amount: incomeAmount.value,
            date: incomeDate.value,
        };

        incomeArray.push(incomeObject);
        localStorage.setItem("incomeArray", JSON.stringify(incomeArray));
    });
}

let expenseContainer = []

if (submitExpense !== null) {
    submitExpense.addEventListener("click", function () {
        let total = parseInt(epens.textContent, 10) + parseInt(expenseAmount.value, 10);
        localStorage.setItem("expenseAmount", total);

        epens.textContent = `${total}`;

        balanc.textContent = `${parseInt(amt.textContent, 10) - parseInt(epens.textContent, 10)}`;
        localStorage.setItem("balanceAmount", balanc.textContent);

        let expenseObject = {
            id: Date.now(), // unique identifier for each expense
            amount: expenseAmount.value,
            description: description.value,
            time: time.value,
            date: date.value,
            category: categoryValue.textContent,
        };

        expenseContainer.push(expenseObject);
        localStorage.setItem("expenseContainer", JSON.stringify(expenseContainer));

        transactionList.innerHTML = "";
        transactionDetails.innerHTML = "";
        transactionUpdate();
    });
}

if (document.getElementById("today-button") !== null) {
    document
        .getElementById("today-button")
        .addEventListener("click", function () {
            filterTransactions("today");
        });
}

if (document.getElementById("week-button") !== null) {
    document.getElementById("week-button").addEventListener("click", function () {
        filterTransactions("week");
    });
}

if (document.getElementById("month-button") !== null) {
    document
        .getElementById("month-button")
        .addEventListener("click", function () {
            filterTransactions("month");
        });
}

if (document.getElementById("year-button") !== null) {
    document.getElementById("year-button").addEventListener("click", function () {
        filterTransactions("year");
    });
}


// Updated transactionUpdate function with edit and delete functionality
function transactionUpdate() {
    transactionList.innerHTML = "";
    // Clear existing transactions
    expenseContainer.forEach((obj) => {
        const li = document.createElement("li");
        li.classList.add("display-expense");
        li.innerHTML = `
        <div id="image-desc">
            <h1>${obj.category}</h1>
            <div>
                <h4>${obj.description} </h4>
                <h3>${obj.time}</h3>
                <h4>${obj.date}</h4>
            </div>
        </div>
        <h4>$${obj.amount}</h4>`; 

        li.addEventListener("click", function () {
            const div = document.createElement("div");
            div.classList.add("transaction-detailed");
            transactionDetails.innerHTML = "";
            div.innerHTML = `
            <span class="material-symbols-outlined arrow-lefts">arrow_back</span>
            <h3 id="transaction-details-title">Expense transaction Details</h3> <br>
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
            </div>`;

            const arrowLeftsButton = div.querySelector('.arrow-lefts');
arrowLeftsButton.addEventListener('click', function() {
    transactionDetails.style.display = "none";
    transactionDetails.innerHTML = "";
});            
            transactionDetails.appendChild(div);
            transactionDetails.style.display = "block";

            // Add event listener for delete button
            const deleteButton = div.querySelector("#delete");
            deleteButton.addEventListener("click", function () {
                const confirmDelete = confirm("Do you want to delete this expense?");
                if (confirmDelete) {
                    expenseContainer = expenseContainer.filter(exp => exp.id !== obj.id);
                    localStorage.setItem("expenseContainer", JSON.stringify(expenseContainer));

                    // Update total expense and balance
                    const newTotalExpense = expenseContainer.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
                    epens.textContent = newTotalExpense;
                    localStorage.setItem("expenseAmount", newTotalExpense);

                    balanc.textContent = parseInt(amt.textContent, 10) - newTotalExpense;
                    localStorage.setItem("balanceAmount", balanc.textContent);

                    transactionList.innerHTML = "";
                    transactionDetails.innerHTML = "";
                    transactionUpdate();
                    transactionDetails.style.display = "none"; // Close the details view
                }
            });

            // Add event listener for edit button
            const editButton = div.querySelector("#edit");
            editButton.addEventListener("click", function () {
                handleEditExpense(obj.id);
            });
        });

        transactionList.appendChild(li);
    });
    localStorage.setItem("li", transactionList.outerHTML); // Store the updated HTML in localStorage
}

//filter transactions
function filterTransactions(period) {
    const now = new Date();
    let filteredTransactions = expenseContainer.expenseObject;
    let getIncomeArray = localStorage.getItem("incomeArray");
    let incomeTransactions = JSON.parse(getIncomeArray);
  
    let dateRangeText = "";

    if (period === "today") {
        incomeTransactions = incomeTransactions.filter((incomes) => {
            const incomesDate = new Date(incomes.date);
            return incomesDate.toDateString() === now.toDateString();
        });
        filteredTransactions = expenseContainer.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.toDateString() === now.toDateString();
        });

        dateRangeText = `${now.toDateString()}`;
    } else if (period === "week") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        const endOfWeek = new Date(now);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week
        endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

        filteredTransactions = expenseContainer.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfWeek && transactionDate <= now; // Ensures no future dates
        });

        incomeTransactions = incomeTransactions.filter((incomes) => {
            const incomesDate = new Date(incomes.date);
            return incomesDate >= startOfWeek && incomesDate <= now;
        });

        const displayEndOfWeek = endOfWeek > now ? now : endOfWeek;
        dateRangeText = `${startOfWeek.toDateString()} - ${displayEndOfWeek.toDateString()}`;

    } else if (period === "month") {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month

        filteredTransactions = expenseContainer.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfMonth && transactionDate <= now; // Ensures no future dates
        });

        incomeTransactions = incomeTransactions.filter((incomes) => {
            const incomesDate = new Date(incomes.date);
            return incomesDate >= startOfMonth && incomesDate <= now;
        });

        const displayEndOfMonth = endOfMonth > now ? now : endOfMonth;
        dateRangeText = `${startOfMonth.toDateString()} - ${displayEndOfMonth.toDateString()}`;

    } else if (period === "year") {
        // Filter transactions for the current year
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear() + 1, 0, 0);
        filteredTransactions = expenseContainer.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startOfYear && transactionDate <= endOfYear;
        });

        incomeTransactions = incomeTransactions.filter((incomes) => {
            const incomesDate = new Date(incomes.date);
            return incomesDate >= startOfYear && incomesDate <= endOfYear;
        });
        dateRangeText = `Year's Range: ${startOfYear.toDateString()} - ${endOfYear.toDateString()}`;
    }

    displayTransactions(filteredTransactions);

    if (amt !== null) {
        displayIncome(incomeTransactions);
    }

    if (calendarStartInput !== null) {
    displaySummary(filteredTransactions, incomeTransactions);
    }

    updateDateRange(dateRangeText);
}

function updateDateRange(text) {
    const dateRangeDiv = document.getElementById("today");
    dateRangeDiv.textContent = text;
}

function displayIncome(incomes) {
    incomes.reduce((acc, income) => {
        acc += parseInt(income.amount, 10);
        return (amt.textContent = acc);
    }, 0);
}

function displayTransactions(transactions) {
    const transactionListDiv = document.getElementById("transaction-list");
    transactionListDiv.innerHTML = "";
    transactions.forEach((transaction) => {
        const transactionItem = document.createElement("li");
        transactionItem.classList.add("display-expense");
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

        transactionItem.addEventListener("click", function () {
            const div = document.createElement("div");
            div.classList.add("transaction-detailed");
            transactionDetails.innerHTML = "";
            div.innerHTML = `
            <span class="material-symbols-outlined arrow-lefts">arrow_back</span>
    <h3 id="transaction-details-title">Expense trasaction Details</h3> <br>

    <h4 id="description-title">${transaction.description}</h4>
    <h2 id="amount-title">$ ${transaction.amount}</h2> <br>

    <hr>
    <br>
    <p id="transaction-id">Transaction Category: ${transaction.category}</p>

    <div id="transaction-datevalue">
        <p id="transaction-id">Transaction Date</p>
        <p id="date-value">${transaction.date}</p>
    </div>

    <div id="modify">
        <button id="edit"><span class="material-symbols-outlined">edit_square</span>Modify Expense</button>
        <button id="delete"><span class="material-symbols-outlined">delete</span>Delete</button>
    </div>
    `;

    const arrowLeftsButton = div.querySelector('.arrow-lefts');
arrowLeftsButton.addEventListener('click', function() {
    transactionDetails.style.display = "none";
    transactionDetails.innerHTML = "";
}); 
            transactionDetails.appendChild(div);
            transactionDetails.style.display = "block";
        });

        transactionListDiv.appendChild(transactionItem);
    });
}

// Existing Variables and Event Listeners ...

// Function to handle editing an expense
function handleEditExpense(id) {
    // Find the expense by id
    const expense = expenseContainer.find(exp => exp.id === id);

    // Populate the expense form with the existing values
    expenseAmount.value = expense.amount;
    description.value = expense.description;
    time.value = expense.time;
    date.value = expense.date;
    categoryValue.textContent = expense.category;

    expenseContainer = expenseContainer.filter((item) => item.id !== id);

    let total = parseInt(epens.textContent, 10) - parseInt(expense.amount, 10);
    localStorage.setItem("expenseAmount", total);

    epens.textContent = `${total}`;

    balanc.textContent = `${parseInt(expense.amount, 10) + parseInt(balanc.textContent, 10)}`;
    localStorage.setItem("balanceAmount", balanc.textContent);


    // Show the expense form and hide other sections
    addExpense.style.display = "block";
    transactionDetails.style.display = "none";

    // Update the submit button to save the changes
    submitExpense.removeEventListener("click", submitNewExpense);

    submitExpense.addEventListener("click", function saveEditedExpense() {
        // Update the expense object
        expense.amount = expenseAmount.value;
        expense.description = description.value;
        expense.time = time.value;
        expense.date = date.value;
        expense.category = categoryValue.textContent;


        // Update the local storage
        localStorage.setItem("expenseContainer", JSON.stringify(expenseContainer));

        // Refresh the UI
        transactionList.innerHTML = "";
        transactionDetails.innerHTML = "";
        transactionUpdate();

        // Hide the expense form and show the main section
        addExpense.style.display = "none";
        addDiv.style.display = "block";

        // Reset the form and submit button event listener
        submitExpense.removeEventListener("click", saveEditedExpense);
        submitExpense.addEventListener("click", submitNewExpense);
    });
}

function submitNewExpense() {
    let total = parseInt(epens.textContent, 10) + parseInt(expenseAmount.value, 10);
    localStorage.setItem("expenseAmount", total);

    epens.textContent = `${total}`;

    balanc.textContent = `${parseInt(amt.textContent, 10) - parseInt(epens.textContent, 10)}`;
    localStorage.setItem("balanceAmount", balanc.textContent);

    let expenseObject = {
        id: Date.now(), // unique identifier for each expense
        amount: expenseAmount.value,
        description: description.value,
        time: time.value,
        date: date.value,
        category: categoryValue.textContent,
    };

    expenseContainer.push(expenseObject);
    localStorage.setItem("expenseContainer", JSON.stringify(expenseContainer));

    transactionList.innerHTML = "";
    transactionDetails.innerHTML = "";

    transactionUpdate();
}

// Get the date input element
const calendarInput = document.getElementById("calendar-input");

if (calendarInput !== null) {
    // Add event listener for date input change
    calendarInput.addEventListener("change", function () {
        // Get the selected date value
        const selectedDate = new Date(this.value);
        // Filter transactions based on the selected date
        const filteredTransactions = expenseContainer.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.toDateString() === selectedDate.toDateString();
        });
        // Display the filtered transactions
        displayTransactions(filteredTransactions);
    });
}

if (document.querySelector("#search-input") !== null) {
    // Add event listener for search input
    document
        .querySelector("#search-input")
        .addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            const filteredTransactions = expenseContainer.filter((transaction) => {
                return (
                    transaction.category.toLowerCase().includes(query) ||
                    transaction.description.toLowerCase().includes(query)
                );
            });
            displayTransactions(filteredTransactions);
        });
}

//Summary

if (document.querySelector("#calender-inpu") !== null) {
    document
        .querySelector("#calender-inpu")
        .addEventListener("click", function () {
            used.style.display = "flex";
        });
}

// Get the start and end date input elements
const calendarStartInput = document.getElementById("calendar-start");
const calendarEndInput = document.getElementById("calendar-end");

// Add event listeners for date input change
if (calendarStartInput !== null) {
calendarStartInput.addEventListener("change", filterTransactionsByDateRange);
calendarEndInput.addEventListener("change", filterTransactionsByDateRange);
}

function filterTransactionsByDateRange() {
    // Get the start and end dates from the input elements
    const startDate = new Date(calendarStartInput.value);
    const endDate = new Date(calendarEndInput.value);

    // Filter transactions based on the date range
    const filteredTransactions = expenseContainer.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });

    // Display the filtered transactions
    displayTransactions(filteredTransactions);

    // Optionally, update the date range text
    updateDateRange(
        `Range: ${startDate.toDateString()} - ${endDate.toDateString()}`
    );
}

let summaryDiv = document.getElementById("summaryDiv");

function displaySummary(transactions1, incTransactions) {
    // Reset summary div
    summaryDiv.innerHTML = "";

    let totalIncome = incTransactions.reduce((total, income) => {
        total += parseInt(income.amount, 10);
        return total;
    }, 0);

    // console.log(totalIncome)

    // Retrieve total expenses from localStorage

    let totalExpenses = transactions1.reduce(
        (total, transaction) => (total += parseInt(transaction.amount, 10)),
        0
    );

    // Display total income and expenses
    const incomeExpenseDiv = document.createElement("div");
    incomeExpenseDiv.innerHTML = `
      <h2 id='totalinc'>Total Income: $${totalIncome}</h2>
      <h2 id='totalexp'>Total Expenses: $${totalExpenses}</h2>
  `;
    summaryDiv.appendChild(incomeExpenseDiv);

    // Calculate total transactions and expenditure by category
    const categories = {};
    transactions1.forEach((transaction) => {
        const category = transaction.category;
        categories[category] =
            (categories[category] || 0) + parseInt(transaction.amount, 10);
    });

    // Display expenditure by category
    Object.keys(categories).forEach((category) => {
        const expenditure = categories[category];
        const percentage = totalIncome > 0 ? (expenditure / totalIncome) * 100 : 0;

        // Create colored div representing the percentage of expenditure
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category-summary");
        categoryDiv.innerHTML = `
          <h3>${category}</h3>
          <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${percentage}%;"></div>
          </div>
          <p>${percentage.toFixed(2)}% ($${expenditure.toFixed(2)})</p>
 `;
        summaryDiv.appendChild(categoryDiv);
    });
}



// if (setting !== null) {
setting.addEventListener('click', function () {
settings.style.display = 'block';
});

arrowSetting.addEventListener('click', function () {
    settings.style.display = 'none';
})

selectElement.addEventListener('click', function() {
    if (selectElement.value === 'dark') {
        rightSide.style.backgroundColor = 'grey';
      
    }

});

selectElement.addEventListener('click', function() {
    if (selectElement.value === 'light') {
        // console.log('setting');
        rightSide.style.backgroundColor = 'white';
    }
});

currencySelector.addEventListener('change', function () {
    currency.forEach(currencyPair => {
        currencyPair.textContent = currencySelector.value
     } )

     localStorage.setItem('currencyValue', currencySelector.value)
})

