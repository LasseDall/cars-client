import { API_URL} from "../../settings.js"

//Add id to this URL to get a single user
const URL = API_URL + "/cars"

export function initFindEditCar(){
    document.getElementById("btn-fetch-car").onclick = getCar;
    document.getElementById("btn-submit-edited-car").onclick = editCar;
}

async function getCar() {
    const token = localStorage.token;
    const id = document.getElementById("car-id-input").value
    await fetch(URL+"/"+id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("info-text").innerText = `ID: ${data.id} Brand: ${data.brand} Model: ${data.model} Price pr. day: ${data.pricePrDay} Best discount: ${data.bestDiscount}`
            document.getElementById("car-id").placeholder = `${data.id}`
        })
}

async function editCar() {
    const id = document.getElementById("car-id").value
    const newBrand = document.getElementById("brand").value
    const newModel = document.getElementById("model").value
    const newPrice = document.getElementById("price-pr-day").value
    const newDiscount = document.getElementById("best-discount").value
    const data = { "brand": newBrand, "model": newModel, "pricePrDay": newPrice, "bestDiscount": newDiscount};

    const token = localStorage.token;
    await fetch(URL+"/"+id, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}