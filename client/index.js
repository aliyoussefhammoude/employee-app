document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});





fetch('http://localhost:5000/getAllCeo')
.then(response => response.json())
.then(data => {
    console.log(data['data'])

    const digits = data['data'];

        const employmentInput = document.querySelector('#employment');
        
        
        employmentInput.addEventListener('change', function() {
            const employment = employmentInput.value;

            if(digits.includes(1) && employment === "CEO") {
                document.getElementById("add-btn").disabled = true;
            }else if(digits.includes(1) && (employment === "Employee" || employment === "Manager")) {
                document.getElementById("add-btn").disabled = false;
            }else if(!(digits.includes(1)) && (employment === "Employee" || employment === "Manager" || employment === "CEO")) {
                document.getElementById("add-btn").disabled = false;
            }
           
        });
    
  
});




document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');


function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateEmpInput = document.querySelector('#update-emp-input');
    const updateNameInput = document.querySelector('#update-name-input');


    const isCEO = () => {
        if (updateEmpInput.value === "Employee") {
            return false
        }else if (updateEmpInput.value === "Manager") {
            return false
        }else if (updateEmpInput.value === "CEO") {
            return true
        }
    }
    const isMANAGER = () => {
        if (updateEmpInput.value === "Employee") {
            return false
        }else if (updateEmpInput.value === "Manager") {
            return true
        }else if (updateEmpInput.value === "CEO") {
            return false
        }
    }
console.log(updateNameInput.dataset.id + ' ' + isCEO() + ' ' + isMANAGER())
    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            firstname: updateNameInput.value,
            isceo: isCEO(),
            ismanager: isMANAGER()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


const addBtn = document.querySelector('#add-btn');

addBtn.onclick = function () {
    const firstNameInput = document.querySelector('#firstname-input');
    const firstName = firstNameInput.value;
    firstNameInput.value = "";

    const lastNameInput = document.querySelector('#lastname-input');
    const lastName = lastNameInput.value;
    lastNameInput.value = "";

    const employmentInput = document.querySelector('#employment');
    const employment = employmentInput.value;

    const rankInput = document.querySelector('#rank');
    const rank = rankInput.value;

    const managerid = 0;

    const salary = () => {
        if (employment === "Employee") {
            return rank * 1.125
        }else if (employment === "Manager") {
            return rank * 1.725
        }else if (employment === "CEO") {
            return rank * 2.725
        }
    }
    const isCEO = () => {
        if (employment === "Employee") {
            return false
        }else if (employment === "Manager") {
            return false
        }else if (employment === "CEO") {
            return true
        }
    }
    const isMANAGER = () => {
        if (employment === "Employee") {
            return false
        }else if (employment === "Manager") {
            return true
        }else if (employment === "CEO") {
            return false
        }
    }

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            firstname : firstName,
            lastname : lastName,
            salary : salary(),
            isceo : isCEO(),
            ismanager : isMANAGER(),
            managerid : managerid
        })
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
    location.reload();

}

function insertRowIntoTable(data) {
    
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, firstname, lastname, salary, isceo, ismanager, managerid}) {
        tableHtml += "<tr>";
            tableHtml += `<td>${id}</td>`;
            tableHtml += `<td>${firstname}</td>`;
            tableHtml += `<td>${lastname}</td>`;
            tableHtml += `<td>${salary}</td>`;
            tableHtml += `<td><span id="ceo">${isceo}</span></td>`;
            tableHtml += `<td>${ismanager}</td>`;
            tableHtml += `<td>${managerid}</td>`;
            tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
            tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

  

}