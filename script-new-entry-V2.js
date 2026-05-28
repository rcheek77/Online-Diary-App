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

        // Create a new journal entry
    function createNewJournal() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', options);
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        currentJournalId = null;
        journalTitle.value = '';
        journalContent.value = '';
        journalDate.textContent = dateStr;
        journalTime.textContent = timeStr;
        
        // Reset mood to defaults
        moodButtons.forEach(btn => btn.classList.remove('active'));
        moodButtons[0].classList.add('active');

    }

    // Open an existing journal entry
    function openJournal(id) {
        const journal = journals.find(j => j.id === id);
        if (!journal) return;
        
        currentJournalId = id;
        journalTitle.value = journal.title;
        journalContent.value = journal.content;
        journalDate.textContent = journal.date;
        journalTime.textContent = journal.time;

        
        // Set mood
        moodButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mood === journal.mood) {
                btn.classList.add('active');
            }
        });
    }

    // Save journal entry
    function saveJournal() {
        const title = journalTitle.value.trim();
        const content = journalContent.value.trim();
        
        if (!title) {
            alert('Please enter a title for your journal entry');
            return;
        }
        
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', options);
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        const activeMood = document.querySelector('.mood-btn.active').dataset.mood;
        
        if (currentJournalId) {
            // Update existing journal
            const journalIndex = journals.findIndex(j => j.id === currentJournalId);
            if (journalIndex !== -1) {
                journals[journalIndex] = {
                    ...journals[journalIndex],
                    title,
                    content,
                    date: dateStr,
                    time: timeStr,
                    mood: activeMood,
                };
            saveToLocal()
            }

        } else {
            // Create new journal
            const newId = journals.length > 0 ? Math.max(...journals.map(j => j.id)) + 1 : 1;
            const newJournal = {
                id: newId,
                title,
                content,
                date: dateStr,
                time: timeStr,
                mood: activeMood,
            };
            
            journals.unshift(newJournal);
            currentJournalId = newId;
        saveToLocal()
        }        
        
        renderJournalList();
        alert('Journal entry saved successfully!');

    }

    // Delete journal entry
    function deleteJournal() {
        if (!currentJournalId) return;
        
        if (confirm('Are you sure you want to delete this journal entry?')) {
            journals = journals.filter(j => j.id !== currentJournalId);
            currentJournalId = null;
            saveToLocal()
            renderJournalList();
            currentJournalId = null;
            journalTitle.value = '';
            journalContent.value = '';
                       
            // Reset mood to defaults
            moodButtons.forEach(btn => btn.classList.remove('active'));
            moodButtons[0].classList.add('active');
            }
    }
   
    // Initialize the app
    init();
    loadFromLocal();
});