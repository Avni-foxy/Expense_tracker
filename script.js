document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let editIndex = -1;

    updateExpenseList();
    updateTotal();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

        if (expenseName && expenseAmount) {
            if (editIndex >= 0) {
                expenses[editIndex] = { name: expenseName, amount: expenseAmount };
                editIndex = -1;
                submitButton.textContent = 'Add Expense';
                formTitle.textContent = 'Add New Expense';
            } else {
                const expense = { name: expenseName, amount: expenseAmount };
                expenses.push(expense);
            }
            updateLocalStorage();
            updateExpenseList();
            updateTotal();
            form.reset();
        } else {
            alert('Please enter valid expense details.');
        }
    });

    function updateExpenseList() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)}
                <div>
                    <button class="edit" onclick="editExpense(${index})">Edit</button>
                    <button class="delete" onclick="deleteExpense(${index})">Delete</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function updateLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    window.editExpense = function(index) {
        document.getElementById('expense-name').value = expenses[index].name;
        document.getElementById('expense-amount').value = expenses[index].amount;
        editIndex = index;
        submitButton.textContent = 'Update Expense';
        formTitle.textContent = 'Edit Expense';
    }

    window.deleteExpense = function(index) {
        expenses.splice(index, 1);
        updateLocalStorage();
        updateExpenseList();
        updateTotal();
    }
});
