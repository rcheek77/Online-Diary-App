document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const journalList = document.getElementById('journalList');
    const emptyState = document.getElementById('emptyState');
    const journalEditor = document.getElementById('journalEditor');
    const newEntryBtn = document.getElementById('newEntryBtn');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const journalTitle = document.getElementById('journalTitle');
    const journalContent = document.getElementById('journalContent');
    const journalDate = document.getElementById('journalDate');
    const journalTime = document.getElementById('journalTime');
    const moodButtons = document.querySelectorAll('.mood-btn');
    const storageKey = "journals"

    // Sample journal entries
    let journals = [];

    let currentJournalId = null;
    let currentView = 'empty'; // 'empty', 'editor', 'stats'

    // Initialize the app
    function init() {
        renderJournalList();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        newEntryBtn.addEventListener('click', createNewJournal);
        saveBtn.addEventListener('click', saveJournal);
        deleteBtn.addEventListener('click', deleteJournal);        
        
        moodButtons.forEach(button => {
            button.addEventListener('click', function() {
                moodButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Render the journal list
    function renderJournalList() {
        journalList.innerHTML = '';
        
        if (journals.length === 0) {
            journalList.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 20px;">No journal entries yet</p>';
            return;
        }
        
        journals.forEach(journal => {
            const journalItem = document.createElement('div');
            journalItem.className = 'journal-item';
            if (journal.id === currentJournalId) {
                journalItem.classList.add('active');
            }
            
            journalItem.innerHTML = `
                <div class="journal-date">${journal.date} • ${journal.time}</div>
                <div class="journal-preview">${journal.title}</div>
            `;
            
            journalItem.addEventListener('click', () => openJournal(journal.id));
            journalList.appendChild(journalItem);
        });
    }

    // load items from local storage
    function loadFromLocal() {
        const oldEntries = localStorage.getItem(storageKey)
        if (oldEntries) journals = JSON.parse(oldEntries)
        renderJournalList()
    }

    // save to local storage 
    function saveToLocal() {
         const stringJnls = JSON.stringify(journals);
         localStorage.setItem(storageKey, stringJnls)
    }

      
   
    // Initialize the app
    init();
    loadFromLocal();
});