const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase_check")
const lowerCaseCheckEl = document.querySelector("#lowercase_check")
const numberCaseCheckEl = document.querySelector("#number_check")
const symbolCaseCheckEl = document.querySelector("#symbol_check")
const securityIndicatorBarEl = document.querySelector("#security_indicator_bar")

let passwordLength = 16

function generatepassword() {
    let chars = ""
        const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
        const numberChars = "1234567890"
        const symbolChars = "!@#$%&*()-=_[]?"

    if(upperCaseCheckEl.checked){
        chars += upperCaseChars
    }

    if(lowerCaseCheckEl.checked){
        chars += lowerCaseChars}

    if(numberCaseCheckEl.checked){
        chars += numberChars
    }

    if(symbolCaseCheckEl.checked){
        chars += symbolChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++){
        const randomNumber = Math.floor(Math.random()*chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    // 20% -> critico => 100% -> safe
    // A*P1 + B*P2 + C*P3 + D*P4 + E*P5 = 100
    // Tam*15% + Mai*17.5% + Min*17.5% + Num*17.5% + Sym*32.5% = 100
    

    const percent = Math.round(
        (passwordLength/64)*100*0.15 +
        (upperCaseCheckEl.checked ? 17.5 : 0) +
        (lowerCaseCheckEl.checked ? 17.5 : 0) +
        (numberCaseCheckEl.checked ? 20 : 0) + 
        (symbolCaseCheckEl.checked ? 30 : 0)
    )

    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69) {
        //safe
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    } else if (percent > 50) {
        //warning
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.add("warning")
    } else {
        //critical
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("critical")
    }

    if(percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.remove("completed")
    }

}

function calculateFontSize() {
    if(passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if(passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
    } else if(passwordLength > 22) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password_length")
passwordLengthEl.addEventListener("input", function(){
    passwordLength = passwordLengthEl.value
    document.querySelector("#password_length_text").innerText = passwordLength
    generatepassword()
})
upperCaseCheckEl.addEventListener('click', generatepassword)
lowerCaseCheckEl.addEventListener('click', generatepassword)
numberCaseCheckEl.addEventListener('click', generatepassword)
symbolCaseCheckEl.addEventListener('click', generatepassword)

document.querySelector("#copy").addEventListener('click', copy)
document.querySelector("#copy2").addEventListener('click', copy)
document.querySelector("#renew").addEventListener('click', generatepassword)

generatepassword()