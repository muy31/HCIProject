// Function to fetch data from Google Sheets
function fetchDataFromGoogleSheet() {
    // Replace 'YOUR_SHEET_URL' with the URL of your Google Sheet
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1J_NZ-Fnok0mC_i9rCVVpr65_cUdhJx0D5cMkOfgiPsQ/edit?resourcekey#gid=104536495';
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            // Assuming the data is in CSV format, you can parse it accordingly
            const rows = data.split('\n');
            const dataArray = rows.map(row => row.split(','));

            // Do something with the data
            console.log(dataArray);
            // Example: Display data in a div
            const dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = '<pre>' + JSON.stringify(dataArray, null, 2) + '</pre>';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the function when the page loads
window.onload = fetchDataFromGoogleSheet;