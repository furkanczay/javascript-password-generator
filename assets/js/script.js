const strengthSlider = document.querySelector('#strengthSlider');
const strengthMeter = document.querySelector('.strength-counter');
const strengthSelectorForm = document.querySelector('#strength-selector-form');
const passwordText = document.querySelector('.password-text');
const copyBtn = document.querySelector('.copy-btn');
const copiedText = document.querySelector('.copied-text');
const strengthChecker = document.querySelector('.strength-viewer-card__strength');

strengthMeter.textContent = strengthSlider.value;
strengthChecker.innerText = checkPasswordStrength(strengthSlider.value);


copyBtn.addEventListener('click', () => {
    copiedText.classList.add('active');
    setTimeout(() => {
        copiedText.classList.remove('active');
    }, 2000);
    navigator.clipboard.writeText(passwordText.textContent);
})

strengthSelectorForm.addEventListener('submit', e => {
    e.preventDefault();
    copiedText.classList.remove('active');
    const formData = Object.fromEntries(new FormData(e.target));
    const { strengthValue, uppercaseLetters, lowercaseLetters, numbers, symbols } = formData;
    if(!validateForm()) {
        alert('Please select at least one option');
        return;
    }
    const password = generatePassword(strengthValue, uppercaseLetters, lowercaseLetters, numbers, symbols);
    passwordText.textContent = password;
})

function validateForm() {
    // Checkbox'ların durumlarını kontrol et
    let checkboxes = document.querySelectorAll('.strength-options-checkbox');
    let checked = false;
    
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checked = true;
        }
    });

    // En az bir checkbox işaretli değilse uyarı ver
    if (!checked) {
        return false;
    } else {
        return true;
    }
}


strengthSlider.addEventListener('input', function(e) {
    const strengthValue = e.target.value;
    strengthMeter.textContent = strengthValue;
    const strengthChecked = checkPasswordStrength(strengthValue);
    console.log(strengthChecked);
    strengthChecker.innerText = strengthChecked;
});


function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    console.log(uppercase);
    let result = '';
    let characters = '';
    if (uppercase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } 
    if (lowercase) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (numbers) {
        characters += '0123456789';
    }
    if (symbols) {
        characters += '!@#$%^&*()_+';
    }
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const charactersLength = characters.length;
    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function checkPasswordStrength(value){
    let strength;
    if(value < 7) {
        strength = 'Too Weak';
    }
    else if(value < 14) {
        strength = 'Weak';
    }
    else if(value < 21) {
        strength = 'Medium';
    }
    else {
        strength = 'Strong';
    }
    return strength;
}