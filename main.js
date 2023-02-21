getCurses()
let rates = {}
const usdValue = document.querySelector('[data-value = "USD"]')
const eurValue = document.querySelector('[data-value = "EUR"]')
const cnyValue = document.querySelector('[data-value = "CNY"]')

const select = document.querySelector('#select')
const input = document.querySelector('#input')
const result = document.querySelector('#result')
async function getCurses () {
    let response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    let data = await response.json()
    let result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.CNY = result.Valute.CNY;

    usdValue.textContent = rates.USD.Value.toFixed(2)
    eurValue.textContent = rates.EUR.Value.toFixed(2)
    cnyValue.textContent = rates.CNY.Value.toFixed(2)

    if (rates.USD.Value > rates.USD.Previous) {
        usdValue.classList.add('top')
    } else {
        usdValue.classList.add('bottom')
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        eurValue.classList.add('top')
    } else {
        eurValue.classList.add('bottom')
    }

    if (rates.CNY.Value > rates.CNY.Previous) {
        cnyValue.classList.add('top')
    } else {
        cnyValue.classList.add('bottom')
    }


}
input.oninput = convertValue;
select.oninput = convertValue

function convertValue () {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}