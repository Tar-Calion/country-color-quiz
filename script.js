const countries = [
    {
        name: 'France',
        colors: ['blue', 'white', 'red']
    },
    {
        name: 'Germany',
        colors: ['black', 'red', 'yellow']
    },
    {
        name: 'Italy',
        colors: ['green', 'white', 'red']
    },
    {
        name: 'Belgium',
        colors: ['black', 'yellow', 'red']
    },
    {
        name: 'Ireland',
        colors: ['green', 'white', 'orange']
    },
    {
        name: 'Romania',
        colors: ['blue', 'yellow', 'red']
    },
    {
        name: 'Ukraine',
        colors: ['blue', 'yellow']
    },
    {
        name: 'Poland',
        colors: ['white', 'red']
    },
    {
        name: 'Sweden',
        colors: ['blue', 'yellow']
    },
    {
        name: 'Netherlands',
        colors: ['red', 'white', 'blue']
    },
    {
        name: 'Estonia',
        colors: ['blue', 'black', 'white']
    },
    {
        name: 'Lithuania',
        colors: ['yellow', 'green', 'red']
    },
    {
        name: 'Latvia',
        colors: ['red', 'white']
    },
    {
        name: 'Denmark',
        colors: ['red', 'white']
    },
    {
        name: 'Finland',
        colors: ['blue', 'white']
    },
    {
        name: 'Greece',
        colors: ['blue', 'white']
    },
    {
        name: 'Austria',
        colors: ['red', 'white']
    },
    {
        name: 'Bulgaria',
        colors: ['white', 'green', 'red']
    },
    {
        name: 'Croatia',
        colors: ['red', 'white', 'blue']
    },
    {
        name: 'Czech Republic',
        colors: ['red', 'white', 'blue']
    }
];

let currentDisplayedColors;
let score = 0;

function updateButton(text, handler) {
    const actionButton = document.getElementById('actionButton');
    actionButton.textContent = text;
    actionButton.onclick = handler;
}

function updateScoreDisplay() {
    document.querySelector('.score-display').textContent = `Score: ${score}`;
}

function initializeQuiz() {
    // Randomly select 5 countries
    let selectedCountries = [...countries]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    // Randomly select one of these 5 for colors
    const selectedCountry = selectedCountries[Math.floor(Math.random() * 5)];
    currentDisplayedColors = selectedCountry.colors;
    
    updateColorDisplay(currentDisplayedColors);
    updateOptions(selectedCountries);
    updateScoreDisplay();  // Update score display
    updateButton('Check', checkAnswers);
}

function updateColorDisplay(colors) {
    const colorsDisplay = document.querySelector('.colors-display');
    colorsDisplay.innerHTML = '';
    
    // Create a copy of the colors array and shuffle it
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    
    shuffledColors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        colorsDisplay.appendChild(colorBox);
    });
}

function updateOptions(countries) {
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';
    
    countries.forEach(country => {
        const label = document.createElement('label');
        label.className = 'option';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = country.name;
        
        const countryName = document.createElement('span');
        countryName.textContent = country.name;
        
        // Create a hidden colors container
        const colorsContainer = document.createElement('div');
        colorsContainer.className = 'country-colors hidden';
        country.colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'small-color-box';
            colorBox.style.backgroundColor = color;
            colorsContainer.appendChild(colorBox);
        });
        
        label.appendChild(checkbox);
        label.appendChild(countryName);
        label.appendChild(colorsContainer);
        
        optionsContainer.appendChild(label);
    });
}

function checkAnswers() {
    const options = document.querySelectorAll('.option');
    let allCorrect = true;
    
    options.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        const isChecked = checkbox.checked;
        const countryName = checkbox.value;
        const colorsContainer = option.querySelector('.country-colors');
        
        const countryColors = countries.find(c => c.name === countryName).colors;
        const isCorrectCountry = areColorsSame(countryColors, currentDisplayedColors);
        
        option.classList.remove('correct', 'incorrect');
        
        if ((isChecked && isCorrectCountry) || (!isChecked && !isCorrectCountry)) {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
            allCorrect = false;  // Found an incorrect answer
        }

        colorsContainer.classList.remove('hidden');
    });

    // Update score based on answers
    score += allCorrect ? 1 : -1;
    updateScoreDisplay();

    updateButton('Next Question', resetQuiz);
}

function areColorsSame(colors1, colors2) {
    // Convert to sets to ignore order
    const set1 = new Set(colors1);
    const set2 = new Set(colors2);
    
    // Check if sets have same size and all elements match
    if (set1.size !== set2.size) return false;
    return [...set1].every(color => set2.has(color));
}

function resetQuiz() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.querySelector('input[type="checkbox"]').checked = false;
        option.querySelector('.country-colors').classList.add('hidden');
    });
    
    initializeQuiz();
}
