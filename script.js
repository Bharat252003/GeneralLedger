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
                    <button class="btn delete-btn"><i class="bi bi-trash" data-id=${entry.id} onclick="onDelteEntry(this)"></i></button>
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

