import { API_URL } from "../../settings.js"
const URL = API_URL + "/cars"

export async function initCars() {
    await getAllCars()
}

async function getAllCars() {
    const token = localStorage.token;
    await fetch(URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => makeTable(data))
}

function makeTable(cars) {
    const tableRows = cars.map(car =>
        `<tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.pricePrDay}</td>
        <td>${car.bestDiscount}</td>
    </tr>`)
    const tableRowsAsString = tableRows.join('');
    document.getElementById("table-rows").innerHTML = tableRowsAsString
}



