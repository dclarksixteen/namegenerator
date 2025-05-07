document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const saveBtn = document.getElementById('save-btn');
    const resultDisplay = document.getElementById('result');
    const tagDescription = document.getElementById('tag-description');
    const savedList = document.getElementById('saved-list');
    const styleSelect = document.getElementById('style');
    const lengthSelect = document.getElementById('length');
    
    // Checkbox options
    const numbersCheckbox = document.getElementById('numbers');
    const underscoresCheckbox = document.getElementById('underscores');
    const capitalizeCheckbox = document.getElementById('capitalize');
    const leetCheckbox = document.getElementById('leet');
    const prefixCheckbox = document.getElementById('prefix');
    
    // Gamertag Components Database
    const components = {
        animals: ['Wolf', 'Dragon', 'Hawk', 'Tiger', 'Shark', 'Raven', 'Lion', 'Eagle', 'Cobra', 'Panther', 'Fox', 'Viper', 'Phoenix', 'Raptor', 'Falcon', 'Bear', 'Mantis', 'Lynx', 'Kraken', 'Jaguar'],
        vehicles: ['Phantom', 'Venom', 'Shadow', 'Ghost', 'Stealth', 'Titan', 'Vector', 'Razor', 'Bolt', 'Thunder', 'Rocket', 'Tank', 'Jet', 'Comet', 'Vortex', 'Charger', 'Gunship', 'Destroyer', 'Cruiser', 'Striker'],
        abstract: ['Chaos', 'Vortex', 'Fury', 'Blaze', 'Venom', 'Storm', 'Frost', 'Rage', 'Shadow', 'Thunder', 'Havoc', 'Wrath', 'Void', 'Phantom', 'Stealth', 'Enigma', 'Destiny', 'Eclipse', 'Specter', 'Frenzy'],
        space: ['Nova', 'Nebula', 'Pulsar', 'Comet', 'Galaxy', 'Cosmos', 'Quasar', 'Astro', 'Stellar', 'Eclipse', 'Orbit', 'Meteor', 'Saturn', 'Lunar', 'Solar', 'Cosmic', 'Supernova', 'Asteroid', 'Zenith', 'Celestial'],
        adjectives: ['Dark', 'Elite', 'Savage', 'Epic', 'Prime', 'Royal', 'Swift', 'Ultra', 'Toxic', 'Mystic', 'Fatal', 'Hyper', 'Alpha', 'Mega', 'Supreme', 'Extreme', 'Rogue', 'Omega', 'Inferno', 'Cyber']
    };
    
    // Prefixes and suffixes
    const prefixes = ['xX_', 'TheReal', 'Pro', 'Lord', 'Dark', 'King', 'Elite', 'The', 'Sir', 'Epic'];
    const suffixes = ['_xX', 'Gaming', 'YT', 'TV', 'Pro', 'Official', 'HD', 'Master', 'Boss', 'Legend'];
    
    // Leet speak conversion
    const leetMap = {
        'a': '4',
        'e': '3',
        'i': '1',
        'o': '0',
        's': '5',
        't': '7',
        'z': '2'
    };
    
    // Load saved gamertags from localStorage
    let savedTags = JSON.parse(localStorage.getItem('savedTags')) || [];
    
    // Update the saved tags list
    function updateSavedList() {
        savedList.innerHTML = '';
        savedTags.forEach((tag, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${tag}
                <button class="delete-btn" data-index="${index}">Remove</button>
            `;
            savedList.appendChild(li);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                savedTags.splice(index, 1);
                localStorage.setItem('savedTags', JSON.stringify(savedTags));
                updateSavedList();
            });
        });
    }
    
    // Initialize saved list
    updateSavedList();
    
    // Generate random number
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Get random item from array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Apply random capitalization
    function randomCapitalize(str) {
        return str.split('').map(char => {
            return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        }).join('');
    }
    
    // Convert text to leet speak
    function toLeet(str) {
        return str.toLowerCase().split('').map(char => {
            return leetMap[char] || char;
        }).join('');
    }
    
    // Generate gamertag
    function generateGamertag() {
        const style = styleSelect.value;
        const lengthPref = lengthSelect.value;
        const useNumbers = numbersCheckbox.checked;
        const useUnderscores = underscoresCheckbox.checked;
        const useCapitalization = capitalizeCheckbox.checked;
        const useLeet = leetCheckbox.checked;
        const usePrefix = prefixCheckbox.checked;
        
        let tag = '';
        let description = '';
        
        // Generate base tag based on style
        if (style === 'combo' || lengthPref === 'long') {
            // For combo or long tags, use an adjective + main component
            const adjective = getRandomItem(components.adjectives);
            let mainComponent;
            
            if (style === 'combo') {
                // Pick random category
                const categories = ['animals', 'vehicles', 'abstract', 'space'];
                const randomCategory = getRandomItem(categories);
                mainComponent = getRandomItem(components[randomCategory]);
                description = `A cool combination of an adjective and a ${randomCategory.slice(0, -1)} term.`;
            } else {
                mainComponent = getRandomItem(components[style]);
                description = `A longer tag featuring an adjective and a ${style.slice(0, -1)} term.`;
            }
            
            tag = adjective + mainComponent;
        } else {
            // For short/medium tags, just use the main component
            tag = getRandomItem(components[style]);
            description = `A ${lengthPref} tag based on a ${style.slice(0, -1)} term.`;
        }
        
        // Add underscores if selected
        if (useUnderscores) {
            if (Math.random() > 0.5) {
                tag = tag.replace(/(?=[A-Z])/g, '_').replace(/^_/, '');
            } else {
                tag = tag + '_' + getRandomItem(components.abstract).toLowerCase();
            }
            description += ' Includes underscores for that classic gamer style.';
        }
        
        // Add numbers if selected
        if (useNumbers) {
            if (Math.random() > 0.7) {
                // Years
                tag += getRandomItem(['2024', '2025', '69', '420', '1337']);
            } else {
                // Random numbers
                tag += getRandomNumber(1, 999);
            }
            description += ' Numbers added for uniqueness.';
        }
        
        // Add prefix/suffix if selected
        if (usePrefix) {
            if (Math.random() > 0.5) {
                tag = getRandomItem(prefixes) + tag;
                description += ' Features a cool prefix.';
            } else {
                tag = tag + getRandomItem(suffixes);
                description += ' Complete with an epic suffix.';
            }
        }
        
        // Apply leet speak if selected
        if (useLeet) {
            tag = toLeet(tag);
            description += ' Converted to l33t speak for extra gaming cred.';
        }
        
        // Apply random capitalization if selected
        if (useCapitalization) {
            tag = randomCapitalize(tag);
            description += ' Random capitalization adds a unique flair.';
        }
        
        // Display tag and description
        resultDisplay.textContent = tag;
        tagDescription.textContent = description;
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generateGamertag);
    
    saveBtn.addEventListener('click', function() {
        const currentTag = resultDisplay.textContent;
        if (currentTag !== 'Your gamertag will appear here' && !savedTags.includes(currentTag)) {
            savedTags.push(currentTag);
            localStorage.setItem('savedTags', JSON.stringify(savedTags));
            updateSavedList();
        }
    });
    
    // Generate a tag on page load
    generateGamertag();
});
