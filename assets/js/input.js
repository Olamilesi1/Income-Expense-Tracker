 // Retrieve username from localStorage
const username = localStorage.getItem('username');
// Display welcome message
const welcomeMessage = document.getElementById('welcome');
welcomeMessage.textContent = `Welcome ${username}!`;
 

// Initialize transactions array
let transactions = [];

// Function to add a transaction
function addTransaction(event) {
    event.preventDefault();

    // Get form values
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Add transaction to array
    transactions.push({ date, amount, category });

    // Clear form fields
    document.getElementById('date').value = '';
    document.getElementById('amount').value = '';

    // Update transaction list
    updateTransactionList();

    // Calculate totals
    calculateTotals();
}

// Function to update transaction list
function updateTransactionList() {
    const list = document.getElementById('list-items');
    list.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Date:</strong> ${transaction.date}, <strong>Amount:</strong> $${transaction.amount}, <strong>Category:</strong> ${transaction.category}`;
        list.appendChild(listItem);
    });
}

// Function to calculate totals
function calculateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.category === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const remainingBalance = totalIncome - totalExpenses;

    // Update totals in UI
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('remaining-balance').textContent = remainingBalance.toFixed(2);
}

// Function to generate summary
function generateSummary() {
    const summaryPeriod = document.getElementById('summary-period').value;
    let summaryStartDate, summaryEndDate;

    // Determine summary period
    if (summaryPeriod === 'monthly') {
        const today = new Date();
        summaryStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
        summaryEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (summaryPeriod === 'yearly') {
        const today = new Date();
        summaryStartDate = new Date(today.getFullYear(), 0, 1);
        summaryEndDate = new Date(today.getFullYear(), 11, 31);
    }

    // Filter transactions for the specified period
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= summaryStartDate && transactionDate <= summaryEndDate;
    });

    // Calculate totals for the filtered transactions
    let summaryTotalIncome = 0;
    let summaryTotalExpenses = 0;

    filteredTransactions.forEach(transaction => {
        if (transaction.category === 'income') {
            summaryTotalIncome += transaction.amount;
        } else {
            summaryTotalExpenses += transaction.amount;
        }
    });

    const summaryNetIncome = summaryTotalIncome - summaryTotalExpenses;

    // Update summary in UI
    document.getElementById('summary-total-income').textContent = summaryTotalIncome.toFixed(2);
    document.getElementById('summary-total-expenses').textContent = summaryTotalExpenses.toFixed(2);
    document.getElementById('summary-net-income').textContent = summaryNetIncome.toFixed(2);
}

// Event listener for form submission
document.getElementById('transaction-form').addEventListener('submit', addTransaction);
