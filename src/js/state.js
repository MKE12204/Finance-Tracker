/**
 * Global application state and Data persistence
 */
let currentLang = 'ru';
let transactionsHistory = [];
let currentFilter = 'all';
let deleteIndex = null;

// Persistent storage functions
function save() { 
    localStorage.setItem('finData_Simple', JSON.stringify(transactionsHistory)); 
}

function loadData() {
    const d = localStorage.getItem('finData_Simple');
    if(d) transactionsHistory = JSON.parse(d);
}