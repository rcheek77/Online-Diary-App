document.addEventListener('DOMContentLoaded', function() {
        // DOM Elements
    const homeList = document.getElementById('homeList');
    const homeList2 = document.getElementById('homeList2');
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
        renderJnlsHome();                                           // run renderJnlsHome function on start/loading of page
    }

     
    // Render the journal list to the home page
    function renderJnlsHome() {          
        homeList.innerHTML = '';                 // set textarea where journals are displayed to ''
        
        if (journals.length === 0) {            // if length of journals array is 0, return "No journal entries yet" message
            homeList.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 20px;">No journal entries yet</p>';
            return;
        }
        
        journals.slice(0,2).forEach(function(journal, index) {                        // for first two items,
           
            const homeItem = document.createElement('div');                           // create a new div, called homeItem
            homeItem.className = `home-item${index}`;                                 // assign class
            homeItem.innerHTML = `
                <div class="journal-date">${journal.date} • ${journal.time}</div>       
                <div class="journal-preview">${journal.title}</div>
                <div class="journal-content">${journal.content}</div>
            `;                                                                         // add a new div for the date & time, add a new div for title
            
            homeList.appendChild(homeItem);                                             // append homeItem to homeList in DOM
                                            
        });

        journals.slice(2,5).forEach(function(journal, index) {                          // for items 3 - 5,
           
            const homeItem2 = document.createElement('div');                           // create a new div, called jhomeItem2
            homeItem2.className = `home-item${index+2}`;                               // assign class
            homeItem2.innerHTML = `
                <div class="journal-date">${journal.date} • ${journal.time}</div>       
                <div class="journal-preview">${journal.title}</div>
                <div class="journal-content">${journal.content}</div>
            `;                                                                          // add a new div for the date & time, add a new div for title and add a div for the journal content
            
            homeList2.appendChild(homeItem2);                                           // append to homeItem2 in DOM
                                            
        });

    }


        // load items from local storage
    function loadFromLocal() {
        const oldEntries = localStorage.getItem(storageKey)     // get stringified items from local storage (using storageKey and the storage key)
        if (oldEntries) journals = JSON.parse(oldEntries)       // convert journals string back to HTML
        renderJnlsHome()                                        // run renderJnls Home function
    }

       
   
    // Initialise the app
    init();                                 // run init function
    loadFromLocal();                        // load from local storage on initilisation
});