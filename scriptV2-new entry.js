document.addEventListener('DOMContentLoaded', function() {
        // DOM Elements
    const journalList = document.getElementById('journalList');
    const vaultList = document.getElementById('vaultItem');
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
        renderJournalList();            // run renderJournalList function on start/loading of page
        setupEventListeners();          // run setupEventListeners function on start/loading of page
    }

        // Set up event listeners
    function setupEventListeners() {
        newEntryBtn.addEventListener('click', createNewJournal);        // run createNewJournal function on clicking of new entry button
        saveBtn.addEventListener('click', saveJournal);                 // run saveJournal function on clicking of save button
        deleteBtn.addEventListener('click', deleteJournal);             // run deleteJournal function on clicking of delete button
        
        moodButtons.forEach(button => {                                         // for each mood button (emoji),
            button.addEventListener('click', function() {                       // run function on click of each button:
                moodButtons.forEach(btn => btn.classList.remove('active'));     // remove 'active' class for every other button,
                this.classList.add('active');                                   // add 'active' class to button clicked
            });
        });
    }

        // Render the journal list
    function renderJournalList() {          
        journalList.innerHTML = '';             // set textarea where journals are displayed to ''
        
        if (journals.length === 0) {            // if length of journals array is 0, return "No journal entries yet" message
            journalList.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 20px;">No journal entries yet</p>';
            return;
        }
        
        journals.forEach(journal => {                                                    // for each item in journals array,
            const journalItem = document.createElement('div');                           // create a new div, called journalItem
            journalItem.className = 'journal-item';                                      // assign class
            journalItem.innerHTML = `                                                   
                <div class="journal-preview">${journal.title}</div>    
                <div class="journal-date">${journal.date} • ${journal.time}</div>                   
            `;                                                                          // add a new div for the date & time, add a new div for title
            
            journalItem.addEventListener('click', () => openJournal(journal.id));       // on click, run openJournal function, with assigned (numerical) id
            journalList.appendChild(journalItem);                                       // add (append) new journal to journalList (sidebar)
        });
    }

        // load items from local storage
    function loadFromLocal() {
        const oldEntries = localStorage.getItem(storageKey)     // get stringified items from local storage (using storageKey and the storage key)
        if (oldEntries) journals = JSON.parse(oldEntries)       // convert journals string back to HTML
        renderJournalList()                                     // run renderJournalList function
    }

        // save to local storage 
    function saveToLocal() {                                    
         const stringJnls = JSON.stringify(journals);           // convert journals array to string
         localStorage.setItem(storageKey, stringJnls)           // save string to local storage
    }

        // Create a new journal entry
    function createNewJournal() {
        const now = new Date();                                                                     // new constant for date (built in function)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };                         // new constant for format of date
        const dateStr = now.toLocaleDateString('en-US', options);                                   // new constant to convert new date into a readable string
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });    // new constant to convert new time into a readable string
        
        currentJournalId = null;                        // reset numberic id of journals back to null
        journalTitle.value = '';                        // content of journal title = ''
        journalContent.value = '';                      // journal content value = ''
        journalDate.textContent = dateStr;              // text content of journalDate (above) set to new string above
        journalTime.textContent = timeStr;              // text content of journalTime (above) set to new string above
        
        // Reset mood to defaults
        moodButtons.forEach(btn => btn.classList.remove('active'));     // remove active class on all emoji buttons
        moodButtons[0].classList.add('active');                         // add active class to first emoji button by default

    }

        // Open an existing journal entry
    function openJournal(id) {
        const journal = journals.find(j => j.id === id);        // new constant called "journal", search through journals array, check if current object's ID matches target ID
                                                                // arrow function used as condition
        if (!journal) return;                                   // if nothing found, return
        
        currentJournalId = id;                          // reassign numercical id to current id object
        journalTitle.value = journal.title;             // assign journal (constant) title id to journalTitle
        journalContent.value = journal.content;         // assign journal (constant) content id to journalContent
        journalDate.textContent = journal.date;         // assign journal (constant) date id (text content) to journalDate
        journalTime.textContent = journal.time;         // assign journal (constant) time id (text content) to journalTime

        
        // Set mood for opened journal entry
        moodButtons.forEach(btn => {
            btn.classList.remove('active');             // for each emoji button, remove 'active' class
            if (btn.dataset.mood === journal.mood) {    // if emoji button id = numeric id, 
                btn.classList.add('active');            // add 'active' class to that emoji button
            }                                       
        });
    }

        // Save journal entry
    function saveJournal() {                            
        const title = journalTitle.value.trim();        // new constant for title, based on value of journalTitle, trimmed of whitespace
        const content = journalContent.value.trim();    // new constant for content, based on value of journalContent, trimmed of whitespace
        
        if (!title) {                                               // if title is empty:
            alert('Please enter a title for your journal entry');   // show alert
            return;                                                 // return
        }
        
        const now = new Date();                                                                     // new constant for new date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };                         // new constant for format of date
        const dateStr = now.toLocaleDateString('en-US', options);                                   // new constant to convert new date into a readable string
        const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });    // new constant to convert new time into a readable string
        
        const activeMood = document.querySelector('.mood-btn.active').dataset.mood;                 // save active emkoji button, assigning class '.mood-btn.active'
        
        if (currentJournalId) {                                                         // if current numeric id of journal,
            // Update existing journal
            const journalIndex = journals.findIndex(j => j.id === currentJournalId);    // new constant journalIndex, find first item in journals array with id that
                                                                                        // matches the currentJournalId
            if (journalIndex !== -1) {                      // if journalIndex does not equal -1,
                journals[journalIndex] = {                  // index of journals array
                    ...journals[journalIndex],              // save journal index
                    title,                                  // save title
                    content,                                // save content
                    date: dateStr,                          // save date
                    time: timeStr,                          // save time
                    mood: activeMood,                       // save mood (emoji)
                };
            saveToLocal()                                   // run saveToLocal function to save to local storage
            }

        } else {                                            // otherwise
            // Create new journal
            const newId = journals.length > 0 ? Math.max(...journals.map(j => j.id)) + 1 : 1;   // constant newID, check if array has any entries (journals.length > 0)
                                                                                                // find highest number of numeric id, extract all id numbers to new list (.map)
                                                                                                // increment by 1, or defualt to 1 if array is empty
            const newJournal = {
                id: newId,              // new ID assigned
                title,                  // save title
                content,                // save content
                date: dateStr,          // save date
                time: timeStr,          // save time
                mood: activeMood,       // save mood (emoji)
            };
            
            journals.unshift(newJournal);   // add newJournal to the beginning of journals array
            currentJournalId = newId;       // set the currentJournalId to newID
        saveToLocal()                       // run saveToLocal function to save to local storage
        }        
        
        renderJournalList();                        // run renderJournalList function
        alert('Journal entry saved successfully!'); // once journal saved, show this alert
        createNewJournal();
    }

        // Delete journal entry
    function deleteJournal() {
        if (!currentJournalId) return;      // if currentJournalId is empty, return
        
        if (confirm('Are you sure you want to delete this journal entry?')) {       // confirmation box
            journals = journals.filter(j => j.id !== currentJournalId);             // filter out the item with the id being deleted
            currentJournalId = null;                                                // set id to null
            saveToLocal()                                                           // save updated array to local storage
            renderJournalList();                                                    // run renderJournalList function with updated (filtered) array
            currentJournalId = null;                                                // set id to null
            journalTitle.value = '';                                                // reset title value to ''
            journalContent.value = '';                                              // reset content value to ''
                       
            // Reset mood to defaults
            moodButtons.forEach(btn => btn.classList.remove('active'));             // for each mood button (emoji), remove active class
            moodButtons[0].classList.add('active');                                 // set first mood button (emoji) to active class
            }
    }
   
    // Initialise the app
    init();                                 // run init function
    loadFromLocal();                        // load from local storage on initilisation
});