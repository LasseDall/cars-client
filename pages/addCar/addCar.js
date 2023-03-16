
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
//Add id to this URL to get a single user
const URL = `${API_URL}/cars`

export async function initAddCar(match) {
  document.getElementById("btn-submit-car").onclick = await newCar;
}

async function newCar() {
    const brand = document.getElementById("brand").value
    const model = document.getElementById("model").value
    const pricePrDay = document.getElementById("price-pr-day").value
    const bestDiscount = document.getElementById("best-discount").value
    const data = { "brand": brand, "model": model, "pricePrDay": pricePrDay, "bestDiscount": bestDiscount};

    const token = localStorage.token
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
