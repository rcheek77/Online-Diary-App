const datetimeDisplayElement = document.getElementById("date-display");

    // Create a new Date object
    const currentDateTime = new Date();

    // Extract the date and time components
    const date = currentDateTime.toDateString();

    // Display the date and time in the span element
    datetimeDisplayElement.textContent = ` ${date} `;