const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const message = document.getElementById("message");

//default the date field to today (local time)
document.getElementById("date").value = new Date().toLocaleDateString("en-CA");

async function loadExpenses() {
    try {
        const res = await fetch("/expenses");
        if (!res.ok) throw new Error("Could not load expenses");
        renderExpenses(await res.json());
    } catch (err) {
        message.textContent = err.message;
    }
}

function renderExpenses(expenses) {
    list.innerHTML = "";

    if (expenses.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No expenses yet. Add your first one above.";
        list.appendChild(empty);
        return;
    }

    for (const e of expenses) {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = `${e.date} - ${e.category} - ₦${e.amount.toLocaleString()}` + (e.description ? ` . ${e.description}` : "");

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => deleteExpense(e.id));

        li.append(text, btn);
        list.appendChild(li);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";

    const data = {
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value.trim(),
        description: document.getElementById("description").value.trim(),
        date: document.getElementById("date").value,
    };

    try {
        const res = await fetch("/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Could not add the expense. Check your input.");

        form.reset();
        document.getElementById("date").value = new Date().toLocaleDateString("en-CA");
        loadExpenses();
    } catch (err) {
            message.textContent = err.message;
    }
});

async function deleteExpense(id) {
    try {
        const res = await fetch(`/expense/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Could not delete the expense.");
        loadExpenses();
    } catch (err) {
        message.textContent = err.message;
    }
}

loadExpenses();