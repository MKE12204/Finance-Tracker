/**
 * UI Manipulation, Charts and Localization logic
 */

// Chart Initialization
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: [], datasets: [{ data: [], backgroundColor: ["#2ecc71", "#e67e22", "#3498db", "#9b59b6", "#95a5a6"] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#888' } } } }
});

// Switch language and re-render UI components
window.changeLanguage = function(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Header & Balance
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('balance-label').innerText = t.balance;
    document.getElementById('income-label').innerText = t.income;
    document.getElementById('expense-label').innerText = t.expense;
    
    // Form & Controls
    document.getElementById('add-btn').innerText = t.add;
    document.getElementById('history-title').innerText = t.history;
    document.getElementById('filter-all').innerText = t.allBtn;
    document.getElementById('filter-inc').innerText = t.incBtn;
    document.getElementById('filter-exp').innerText = t.expBtn;
    document.getElementById('search-input').placeholder = t.search;
    document.getElementById('reason-input').placeholder = t.placeholderR;
    document.getElementById('amount-input').placeholder = t.placeholderA;
    document.getElementById('opt-income').innerText = t.optInc;
    document.getElementById('opt-expense').innerText = t.optExp;
    
    // Confirm Modal
    document.getElementById('modal-text').innerText = t.modalT;
    document.getElementById('confirm-delete').innerText = t.modalY;
    document.getElementById('cancel-delete').innerText = t.modalN;

    const catSelect = document.getElementById('category-select');
    for (let opt of catSelect.options) { opt.text = t[opt.value]; }

    updateUI();
};

// Core UI Update function
window.updateUI = function() {
    const list = document.getElementById('transaction-list');
    list.innerHTML = "";
    let inc = 0, exp = 0, catMap = {};
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    transactionsHistory.forEach(item => {
        if (item.amount > 0) inc += item.amount; else exp += Math.abs(item.amount);
        const translatedCat = translations[currentLang][item.category];
        catMap[translatedCat] = (catMap[translatedCat] || 0) + Math.abs(item.amount);
    });

    const filtered = transactionsHistory.filter(item => {
        const matchesFilter = currentFilter === 'all' || (currentFilter === 'income' && item.amount > 0) || (currentFilter === 'expense' && item.amount < 0);
        return matchesFilter && item.reason.toLowerCase().includes(searchTerm);
    });

    filtered.forEach((item) => {
        const realIndex = transactionsHistory.indexOf(item);
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <small>${item.date} | ${translations[currentLang][item.category]}</small>
                <span style="display:block; font-weight:600;">${item.reason || '---'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <b style="color:${item.amount > 0 ? '#2ecc71':'#e74c3c'}">${item.amount}$</b>
                <button class="delete-btn" onclick="askDelete(${realIndex})">×</button>
            </div>
        `;
        li.onclick = (e) => { if(e.target.tagName !== 'BUTTON') editItem(realIndex); };
        list.appendChild(li);
    });

    document.getElementById('balance-display').innerText = (inc - exp) + " $";
    document.getElementById('total-income').innerText = inc + " $";
    document.getElementById('total-expense').innerText = exp + " $";
    
    myChart.data.labels = Object.keys(catMap);
    myChart.data.datasets[0].data = Object.values(catMap);
    myChart.update();
};