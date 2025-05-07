document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const resultDisplay = document.getElementById('result');
    const nameMeaning = document.getElementById('name-meaning');
    const savedList = document.getElementById('saved-list');
    const genderSelect = document.getElementById('gender');
    const styleSelect = document.getElementById('style');
    
    // Name Database
    const names = {
        male: {
            modern: ['Aiden', 'Jackson', 'Mason', 'Liam', 'Noah', 'Lucas', 'Ethan', 'Elijah', 'Logan', 'Caleb'],
            classic: ['James', 'William', 'John', 'Robert', 'Michael', 'Thomas', 'Charles', 'Henry', 'David', 'Richard'],
            unique: ['Zephyr', 'Atlas', 'Phoenix', 'Orion', 'Axel', 'Caspian', 'Jasper', 'Silas', 'Maddox', 'Thatcher'],
            fantasy: ['Thorin', 'Aragorn', 'Legolas', 'Draven', 'Gareth', 'Magnus', 'Darius', 'Leofric', 'Alaric', 'Caspian']
        },
        female: {
            modern: ['Sophia', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn'],
            classic: ['Elizabeth', 'Margaret', 'Catherine', 'Anne', 'Mary', 'Victoria', 'Eleanor', 'Grace', 'Sarah', 'Rose'],
            unique: ['Aria', 'Luna', 'Aurora', 'Willow', 'Nova', 'Ember', 'Seraphina', 'Juniper', 'Sage', 'Wren'],
            fantasy: ['Arwen', 'Galadriel', 'Eowyn', 'Freya', 'Lyra', 'Morgana', 'Athena', 'Isolde', 'Thalia', 'Elara']
        }
    };

    // Name meanings database (just some examples)
    const meanings = {
        'Aiden': 'Little fire',
        'Jackson': 'Son of Jack',
        'Sophia': 'Wisdom',
        'Emma': 'Universal',
        'James': 'Supplanter',
        'William': 'Resolute protector',
        'Zephyr': 'West wind',
        'Atlas': 'Bearer of the heavens',
        'Thorin': 'Bold one',
        'Aragorn': 'Royal valor',
        'Elizabeth': 'God is my oath',
        'Margaret': 'Pearl',
        'Aria': 'Song or melody',
        'Luna': 'Moon',
        'Arwen': 'Noble maiden',
        'Galadriel': 'Maiden crowned with a radiant garland'
        // Add more meanings as needed
    };

    // Load saved names from localStorage
    let savedNames = JSON.parse(localStorage.getItem('savedNames')) || [];
    
    // Update the saved names list
    function updateSavedList() {
        savedList.innerHTML = '';
        savedNames.forEach((name, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${name}
                <button class="delete-btn" data-index="${index}">Remove</button>
            `;
            savedList.appendChild(li);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                savedNames.splice(index, 1);
                localStorage.setItem('savedNames', JSON.stringify(savedNames));
                updateSavedList();
            });
        });
    }
    
    // Initialize saved list
    updateSavedList();
    
    // Generate random name
    function generateName() {
        const gender = genderSelect.value;
        const style = styleSelect.value;
        
        let namePool;
        if (gender === 'any') {
            // Randomly choose male or female
            const randomGender = Math.random() > 0.5 ? 'male' : 'female';
            namePool = names[randomGender][style];
        } else {
            namePool = names[gender][style];
        }
        
        // Get random name
        const randomName = namePool[Math.floor(Math.random() * namePool.length)];
        
        // Display name
        resultDisplay.textContent = randomName;
        
        // Display meaning if available
        if (meanings[randomName]) {
            nameMeaning.textContent = `Meaning: ${meanings[randomName]}`;
        } else {
            nameMeaning.textContent = '';
        }
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateName);
    
    saveBtn.addEventListener('click', function() {
        const currentName = resultDisplay.textContent;
        if (currentName !== 'Your name will appear here' && !savedNames.includes(currentName)) {
            savedNames.push(currentName);
            localStorage.setItem('savedNames', JSON.stringify(savedNames));
            updateSavedList();
        }
    });
    
    // Generate a name on page load
    generateName();
});
