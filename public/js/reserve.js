const triggerRoute = "/4ktransReserve",
    stage = "/prod";
    
const apiUrl = `https://4jtzwjgt99.execute-api.eu-central-1.amazonaws.com${stage}${triggerRoute}`;

function fillTable(data) {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    // Loop through each element in the JSON array and add it to the table
    data.forEach((element) => {
        let row = tbody.insertRow(); // Create a new row for the element

        let dateCell = row.insertCell(); // Create a new cell for the first column
        let fromCell = row.insertCell(); // Create a new cell for the second column
        let toCell = row.insertCell(); // Create a new cell for the first column
        let phoneCell = row.insertCell(); // Create a new cell for the first column

        // Add the element values to the cells of the row
        dateCell.innerHTML = element.bs; // Assuming the JSON object has a "name" property
        fromCell.innerHTML = element.aq; // Assuming the JSON object has a "value" property
        toCell.innerHTML = element.aq2;
        phoneCell.innerHTML = element.phone;
    });
}

function getReservation(evnt){

    pswrd = window.prompt("Введіть пароль");
    if(pswrd !== "4k") {
        window.alert("пароль не вірний")
        return
    }

    let tbl = document.querySelector("table");
    tbl.style.display = "table";

    let response = fetch(apiUrl, {
        method: 'GET',
        mode: "cors"
    });

    response.then(res => res.json()) // Parse the response as JSON
    .then(fillTable)
    .catch(err => {
        console.log(`sending error\n ${err}`)
    });
}

