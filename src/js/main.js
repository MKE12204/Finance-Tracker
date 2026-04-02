/**
 * Application Entry Point & Event Handlers
 */

// --- Transaction Actions ---
document.getElementById('add-btn').onclick = function() {
    const amt = parseFloat(document.getElementById('amount-input').value);
    const type = document.getElementById('type-select').value;
    if(amt > 0) {
        transactionsHistory.push({
            amount: type === 'expense' ? -amt : amt,
            reason: document.getElementById('reason-input').value,
            category: document.getElementById('category-select').value,
            date: new Date().toLocaleDateString()
        });
        document.getElementById('amount-input').value = ""; 
        document.getElementById('reason-input').value = "";
        updateUI(); save();
    }
};

window.editItem = function(i) {
    const val = prompt(translations[currentLang].editP, transactionsHistory[i].amount);
    if(val !== null && !isNaN(val) && val !== "") { 
        transactionsHistory[i].amount = parseFloat(val); 
        updateUI(); save(); 
    }
};

// --- Modal Controls ---
window.askDelete = function(index) {
    deleteIndex = index;
    document.getElementById('modal-overlay').style.display = 'flex';
};

document.getElementById('confirm-delete').onclick = function() {
    if (deleteIndex !== null) {
        transactionsHistory.splice(deleteIndex, 1);
        save();
        updateUI();
    }
    closeModal();
};

document.getElementById('cancel-delete').onclick = closeModal;
function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    deleteIndex = null;
}

// --- Utils & Theme ---
window.setFilter = (f) => { 
    currentFilter = f; 
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); 
    document.getElementById('filter-' + f.slice(0,3)).classList.add('active'); 
    updateUI(); 
};

document.getElementById('theme-toggle').onclick = function() {
    document.body.classList.toggle('dark');
    this.innerText = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

document.getElementById('export-pdf').onclick = function() {
    const win = window.open('', '_blank');
    const t = translations[currentLang];
    let rows = "";
    transactionsHistory.forEach(i => { 
        rows += `<tr><td>${i.date}</td><td>${t[i.category]}</td><td>${i.reason}</td><td>${i.amount}$</td></tr>`; 
    });
    win.document.write(`<html><head><style>body{font-family:sans-serif;padding:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:10px}</style></head><body><h1>${t.pdfHead}</h1><table><tr><th>${t.thDate}</th><th>${t.thCat}</th><th>${t.thDesc}</th><th>${t.thAm}</th></tr>${rows}</table><script>window.print();window.close();<\/script></body></html>`);
    win.document.close();
};

// --- App Initialization ---
function init() {
    loadData();
    changeLanguage('en'); 
}

init();