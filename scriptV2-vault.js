document.addEventListener('DOMContentLoaded', function() {
        // DOM Elements
    const journalList = document.getElementById('journalList');
    const vaultList = document.getElementById('vaultList');
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
    let journals = [];                                              // new empty array

    let currentJournalId = null;                                    // ID number for each journal, initialise to null
    
        // Initialise the app
    function init() {                           
        renderJnlsVault();                              // run renderJnlsVault function on start/loading of page
    }

     
    // Render the journal list to the vault page
    function renderJnlsVault() {          
        vaultList.innerHTML = '';                        // set textarea where journals are displayed to ''
        
        if (journals.length === 0) {                     // if length of journals array is 0, return "No journal entries yet" message
            vaultList.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 20px;">No journal entries yet</p>';
            return;
        }
        
        journals.forEach(journal => {                                                    // for each item in journals array,
            const vaultItem = document.createElement('div');                             // create a new div, called vaultItem
            vaultItem.className = 'vault-item';                                          // assign class
            vaultItem.innerHTML = `
                <div class="journal-date">${journal.date} • ${journal.time}</div>       
                <div class="journal-preview">${journal.title}</div>
                <div class="journal-content">${journal.content}</div>
            `;                                                                           // add a new div for the date & time, add a new div for title and add a new div for journal content
            
            vaultList.appendChild(vaultItem);                                            // add (append) new journal to vaultlList in DOM
        });
    }


        // load items from local storage
    function loadFromLocal() {
        const oldEntries = localStorage.getItem(storageKey)     // get stringified items from local storage (using storageKey and the storage key)
        if (oldEntries) journals = JSON.parse(oldEntries)       // convert journals string back to HTML
        renderJnlsVault()                                       // run renderJnlsVault function
    }

       
   
    // Initialise the app
    init();                                 // run init function
    loadFromLocal();                        // load from local storage on initilisation
});