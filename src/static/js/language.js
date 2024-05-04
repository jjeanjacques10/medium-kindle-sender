const languageToggle = document.querySelector('#toggle-language');
const englishElements = document.querySelectorAll('.english');
const portugueseElements = document.querySelectorAll('.portuguese');

let isEnglish = true;

languageToggle.addEventListener('click', () => {
    isEnglish = !isEnglish;
    if (isEnglish) {
        convertToEnglish();
    } else {
        convertToPortuguese();
    }
});

function convertToEnglish() {
    languageToggle.innerHTML = '<i class="fas fa-globe"></i><span class="language">EN</span>';
    englishElements.forEach(element => {
        element.style.display = 'block';
    });
    portugueseElements.forEach(element => {
        element.style.display = 'none';
    });
}

function convertToPortuguese() {
    languageToggle.innerHTML = '<i class="fas fa-globe"></i><span class="language">PT</span>';
    englishElements.forEach(element => {
        element.style.display = 'none';
    });
    portugueseElements.forEach(element => {
        element.style.display = 'block';
    });
}