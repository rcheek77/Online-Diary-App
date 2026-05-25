document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('save-entry-btn');           // new constant for data gathering from the Save Entry button
    const textInput = document.getElementById('new-entry-text');        // new constant for data gathered from the new journal entry text
    const headingInput = document.getElementById('title-data');         // new constant for data gathered from the heading input box
    const entriesContainer = document.getElementById('jnl-entries');    // new constant for data gathered from journal entries card container (where the cards ar edisplayed)
    let jnlCard = null;                                                 // set jnlCard to 'nothing'/null

    function saveEntry() {                                                  // new function to save journal entries, and save to localStorage as a string
        const data = [];                                                    // new empty string
        entriesContainer.querySelectorAll('.jnl-card').forEach(card => {    // select all items with class '.jnl-card', for each item in the card:
            data.push({                                                     // push the data entered:
                date: card.querySelector('.jnl-date').textContent,          // assign date from card with class'.jnl-date'
                heading: card.querySelector('.jnl-heading').textContent,    // assign heading from card with class'.jnl-heading'
                text: card.querySelector('.jnl-text').textContent           // assign text from card with class'.jnl-text'
            });
        });
        localStorage.setItem('jnlString', JSON.stringify(data));             // save 'data' array to local Storage, with key data 'jnlString'
    }

    function loadEntry() {                                                   // new function to load data from local storage 
        const data = JSON.parse(localStorage.getItem('jnlString') || '[]');  // get data from key data from local storage and assign to 'data' array
        data.forEach(entry => {                                              // for each item in the array:
            const card = createCard(entry.text, entry.heading, entry.date);  // create a new card with text/heading/date from data entered
            entriesContainer.appendChild(card);                              // append card entries to entriesContainer
        });
    }

    function createCard(text, heading, date) {                          // function to create new journal card
        const card = document.createElement('div');                     // create new div for card,
        card.className = 'jnl-card';                                    // with class '.jnl-card'

        const dateDiv = document.createElement('div');                  // create new div for date
        dateDiv.className = 'jnl-date';                                 // with class '.jnl-date'
        dateDiv.textContent = date || new Date().toLocaleDateString();  // add date entered, or return date in string format (built in object)

        const headingDiv = document.createElement('div');               // create new div for heading
        headingDiv.className = 'jnl-heading';                           // with class '.jnl-heading'
        headingDiv.textContent = heading;                               // add data from heading

        const textDiv = document.createElement('div');      // create a new div for text
        textDiv.className = 'jnl-text';                     // with class '.jnl-text'
        textDiv.textContent = text;                         // add data from text parameter

        const btnGroup = document.createElement('div');     // create a div for the buttons (edit & delete)
        btnGroup.classList = 'jnl-buttons';                 // with class '.jnl-buttons'

        const editBtn = document.createElement('button');   // create a div for the edit button
        editBtn.textContent = '✏️';                         // add pencil logo for edit button
        editBtn.title = "Edit";
        editBtn.className = 'edit-btn';                     // with class '.edit-btn'

        editBtn.addEventListener('click', () => {           // add event listener for click on edit button
            textInput.value = textDiv.textContent;          // on click, change textInput to content of textDiv
            headingInput.value = headingDiv.textContent;    // on click, change headingInput to content of headingDiv
            jnlCard = card;                                 // jnlCard variable now set to value of card
            addBtn.textContent = "Save changes";            // save entry button text updated
        });

        const deleteBtn = document.createElement('button'); // create buttong for delete
        deleteBtn.textContent = '🗑️';                       // add logo of trash can for delete button
        deleteBtn.title = "Delete";
        deleteBtn.className = 'delete-btn';                 // with class '.delete-btn'
        deleteBtn.addEventListener('click', () => {         // add event listener for click on delete button
            card.remove();                                  // remove node from card
            if (jnlCard === card ) {                        // if jnlCard is absolutely equal to card data,
                jnlCard = null;                             // set jnlCard to null
                addBtn.textContent = "Save Entry";          // 'Save Entry' button (addBtn variable) content changed to "Save Entry"
                textInput.value = "";                       // value of text input box = ""
                headingInput.value = "";                    // value of heading input = ""
            }
            saveEntry();                                    // call saveEntry function
        });

        btnGroup.appendChild(editBtn);      // append edit button to btnGroup div
        btnGroup.appendChild(deleteBtn);    // append delete button to btnGroup div

        card.appendChild(dateDiv);      // append date div to card
        card.appendChild(headingDiv);   // append heading div to card
        card.appendChild(textDiv);      // append text div to card
        card.appendChild(btnGroup);     // append buttons div to card

        return card;                    // return the value of card 
     
    }

    addBtn.addEventListener('click', () => {                                // add event listener to Save Entry button
        const text = textInput.value.trim();                                // change text constant to textInput value, trimmed of whitespace
        const heading = headingInput.value;                                 // change heading constant to headingInput value
        if (!text) return alert("Please add a journal entry");              // if not text, show alert

        if(jnlCard) {                                                       // if jnlCard has a value,
            jnlCard.querySelector('.jnl-text').textContent = text;          // change all items in jnlCard with .jnl-text class to value of text
            jnlCard.querySelector('.jnl-heading').textContent = heading;    // change all items in jnlCard with .jnl-heading class to value of heading
            jnlCard = null;                                                 // reset jnlCard to null
            addBtn.textContent = "Save Entry";                              // add a new "save entry" button
        } else {                                                            // otherwise
            const newCard = createCard(text, heading);                      // create a new card with text & heading as parameters
            entriesContainer.appendChild(newCard);                          // append newly created card to entriesContainer (div for journal entries)
        }

        textInput.value = "";                       // reset text value to nothing
        headingInput.value = "";                    // reset heading value to nothing
        saveEntry();                                // call seveEntry function  
    });

    loadEntry();                // run loadEntry function

});
