let exEntry=[
    { "id": 1, "type": "cr", "amount": 10000, "name": "siprtc" },
    { "id": 2, "type": "dr", "amount": 5000, "name": "laptop" },
    { "id": 3, "type": "dr", "amount": 2000, "name": "stationery" },
    { "id": 4, "type": "cr", "amount": 15000, "name": "service_income" },
    { "id": 5, "type": "dr", "amount": 8000, "name": "furniture" },
    { "id": 6, "type": "cr", "amount": 12000, "name": "product_sale" },
    { "id": 7, "type": "dr", "amount": 3000, "name": "repair_expense" },
    { "id": 8, "type": "cr", "amount": 5000, "name": "customer_payment" },
    { "id": 9, "type": "dr", "amount": 4000, "name": "utility_bill" },
    { "id": 10, "type": "cr", "amount": 7000, "name": "interest_income" },
    { "id": 11, "type": "dr", "amount": 2500, "name": "office_supplies" },
    { "id": 12, "type": "cr", "amount": 18000, "name": "product_return" },
    { "id": 13, "type": "dr", "amount": 6000, "name": "employee_salary" },
    { "id": 14, "type": "cr", "amount": 22000, "name": "capital_contribution" },
    { "id": 15, "type": "dr", "amount": 3500, "name": "advertising_expense" },
    { "id": 16, "type": "cr", "amount": 9000, "name": "loan_received" },
    { "id": 17, "type": "dr", "amount": 1500, "name": "phone_bill" },
    { "id": 18, "type": "cr", "amount": 8000, "name": "investment_income" },
    { "id": 19, "type": "dr", "amount": 5000, "name": "software_purchase" },
    { "id": 20, "type": "cr", "amount": 13000, "name": "product_sale" },
    { "id": 21, "type": "dr", "amount": 2200, "name": "cleaning_service" },
    { "id": 22, "type": "cr", "amount": 7500, "name": "interest_income" },
    { "id": 23, "type": "dr", "amount": 4100, "name": "maintenance_expense" },
    { "id": 24, "type": "cr", "amount": 11000, "name": "capital_contribution" },
    { "id": 25, "type": "dr", "amount": 2800, "name": "stationery_purchase" },
    { "id": 26, "type": "cr", "amount": 9500, "name": "customer_payment" },
    { "id": 27, "type": "dr", "amount": 8000, "name": "new_computer" },
    { "id": 28, "type": "cr", "amount": 6000, "name": "product_sale" },
    { "id": 29, "type": "dr", "amount": 3700, "name": "travel_expense" },
    { "id": 30, "type": "cr", "amount": 14000, "name": "service_income" },
    { "id": 31, "type": "dr", "amount": 5200, "name": "insurance_expense" },
    { "id": 32, "type": "cr", "amount": 20000, "name": "loan_received" },
    { "id": 33, "type": "dr", "amount": 4300, "name": "office_rent" },
    { "id": 34, "type": "cr", "amount": 12500, "name": "investment_income" },
    { "id": 35, "type": "dr", "amount": 2900, "name": "software_subscription" },
    { "id": 36, "type": "cr", "amount": 17000, "name": "capital_contribution" },
    { "id": 37, "type": "dr", "amount": 4900, "name": "training_expense" },
    { "id": 38, "type": "cr", "amount": 8200, "name": "interest_income" },
    { "id": 39, "type": "dr", "amount": 6100, "name": "internet_bill" },
    { "id": 40, "type": "cr", "amount": 11500, "name": "product_sale" },
    { "id": 41, "type": "dr", "amount": 3300, "name": "postage_expense" },
    { "id": 42, "type": "cr", "amount": 9600, "name": "customer_payment" },
    { "id": 43, "type": "dr", "amount": 7200, "name": "furniture_purchase" },
    { "id": 44, "type": "cr", "amount": 21000, "name": "loan_received" },
    { "id": 45, "type": "dr", "amount": 1500, "name": "utility_expense" },
    { "id": 46, "type": "cr", "amount": 13000, "name": "service_income" },
    { "id": 47, "type": "dr", "amount": 4100, "name": "marketing_expense" },
    { "id": 48, "type": "cr", "amount": 7500, "name": "investment_income" },
    { "id": 49, "type": "dr", "amount": 5200, "name": "office_supplies" },
    { "id": 50, "type": "cr", "amount": 18000, "name": "capital_contribution" }
];

let entries = JSON.parse(localStorage.getItem("entries")) || [];
const saveBtn = document.getElementById("save-btn");
const ledgerForm = document.getElementById("ledger-form");
const ledgerEntriesList = document.getElementById("ledger-entries");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const nameInput = document.getElementById("name");


let crTotal = 0;
let drTotal = 0;

window.onload = () => {
    console.log(entries);
    renderTable();
};
function renderTable() {
    if (entries.length == 0) {
        ledgerEntriesList.innerHTML = `<td colspan="5" style="text-align: center;">No entries found. Please add some entries.</td>`;
        document.querySelector("tfoot").style.display = "none";
    }else if (entries.length > 0) {
        crTotal = 0;
        drTotal = 0;
        ledgerEntriesList.innerHTML = '';
        document.querySelector("tfoot").style.display = "table-footer-group";

        entries.forEach(entry => {
            ledgerEntriesList.innerHTML += `<td>${entry.type == 'cr' ? 'Credit' : 'Debit'}</td>
                    <td>${entry.name}</td>
                    <td>${entry.type == 'cr' ? entry.amount : ''}</td>
                    <td>${entry.type == 'dr' ? entry.amount : ''}</td>
                    <td>
                    <button class="edit-btn btn" data-id=${entry.id} onclick="onEditEntry(this)"><i class="bi bi-pencil-square" ></i></button>
                    <button class="btn delete-btn" data-id=${entry.id} onclick="onDelteEntry(this)"><i class="bi bi-trash" ></i></button>
                    </td>`;
            entry.type == 'cr' ? crTotal += entry.amount : drTotal += entry.amount;
        });

        document.getElementById("cr-total").innerText = crTotal;
        document.getElementById("dr-total").innerText = drTotal;
        checkBalance();
    }
}

function checkBalance() {
    if (crTotal === drTotal) {
        saveBtn.disabled = false;
    }
    else{
        saveBtn.disabled = true;
    }
}

function onDelteEntry(ele) {
    const id = ele.getAttribute("data-id");
    const entryIndex = entries.findIndex(entry => entry.id == id);
    if (entryIndex > -1) {
        let confirmDelete = confirm("Are you sure you want to delete this entry?");
        if (!confirmDelete) return;
        entries.splice(entryIndex, 1);
        localStorage.setItem("entries", JSON.stringify(entries));
        console.log(entries);
        renderTable();
        checkBalance();
    }
}
function disableEditButtons(isDisable) {
    const editBtns = document.getElementsByClassName("edit-btn");
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].disabled = isDisable;
    }
}
function onEditEntry(ele) {
    const row = ele.closest("tr");
    const id = ele.getAttribute("data-id");
    const entryIndex = entries.findIndex(entry => entry.id == id);
    if (entryIndex > -1) {
        row.innerHTML = `<td><select name="type" id="type-edit" value=${entries[entryIndex].type} required>
            <option value="" selected disabled>Select transaction type</option>
            <option value="cr" ${entries[entryIndex].type === "cr" ? "selected" : ""}>Credit</option>
            <option value="dr" ${entries[entryIndex].type === "dr" ? "selected" : ""}>Debit</option>
        </select></td><td><input type="text" name="name" id="name-edit" value=${entries[entryIndex].name} placeholder="Enter name" required></td>
        ${entries[entryIndex].type === "dr" ? "<td></td>" : ""}
        <td>
        <input type="text" name="amount" id="amount-edit" value=${entries[entryIndex].amount} placeholder="Enter amount" pattern="[0-9.]*" inputmode="numeric" oninput="this.value=this.value.replace(/[^0-9.]/g,'')" required></td>
        ${entries[entryIndex].type === "cr" ? "<td></td>" : ""}

        <td><i class="bi bi-check-circle edit-submit-btn btn" data-id=${entries[entryIndex].id} onclick="onEditSubmit(this)"></i> <i class="bi bi-x-circle edit-cancel-btn btn" data-id=${entries[entryIndex].id} onclick="onEditCancel(this)"></i></td>`;
        disableEditButtons(true);
    }

}
function onEditSubmit(ele) {
    const row = ele.closest("tr");
    const id = ele.getAttribute("data-id");
    const entryIndex = entries.findIndex(entry => entry.id == id);
    if (entryIndex > -1) {
        entries[entryIndex].type = row.querySelector("#type-edit").value;
        entries[entryIndex].amount = parseFloat(row.querySelector("#amount-edit").value);
        entries[entryIndex].name = row.querySelector("#name-edit").value;
        localStorage.setItem("entries", JSON.stringify(entries));
        renderTable();
        disableEditButtons(false);
    }

}
function onEditCancel(ele){
    disableEditButtons(false);
    renderTable();
}
document.getElementById("ledger-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const type = typeInput.value;
    const amount = parseFloat(amountInput.value);
    const name = nameInput.value.trim();

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
    } else {
        let id;
        if (entries.length == 0) {
             id = 1;
        }else{

             id = entries[entries.length-1].id + 1;
        }
        entries.push({ id, type, amount, name });
        localStorage.setItem("entries", JSON.stringify(entries));
        renderTable();
        ledgerForm.reset();
        console.log(entries);
    }

});

