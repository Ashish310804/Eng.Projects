const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  if (!description || isNaN(amount)) return;

  transactions.push({
    id: Date.now(),
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactionList();
  updateSummary();

  transactionFormEl.reset();
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";

  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const li = document.createElement("li");

    li.classList.add("list-group-item");
    li.classList.add(
      transaction.amount > 0
        ? "transaction-income"
        : "transaction-expense"
    );

    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>
        ${formatCurrency(transaction.amount)}
        <button class="delete-btn ms-2" onclick="removeTransaction(${transaction.id})">
          ×
        </button>
      </span>
    `;

    transactionListEl.appendChild(li);
  });
}

function updateSummary() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactionList();
  updateSummary();
}

updateTransactionList();
updateSummary();