const API_URL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

async function getData() {
    try {
        const response = await fetch(API_URL);

        // Log response metadata
        console.log("Response OK:", response.ok); // Check if the response is successful
        console.log("Status Code:", response.status); // HTTP status code
        console.log("Status Text:", response.statusText); // HTTP status message
        console.log("Headers:", response.headers); // Headers object
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse response as JSON
        console.log("Data Retrieved:", data); // Log the retrieved data

        // Check if records exist and iterate through them
        if (data.records && Array.isArray(data.records)) {
            const tableBody = document.getElementById("data-table");
            if (data.records.length > 0) {
                data.records.forEach(record => {
                    const fields = record.record.fields;

                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${fields.year || "N/A"}</td>
                        <td>${fields.semester || "N/A"}</td>
                        <td>${fields.the_programs || "N/A"}</td>
                        <td>${fields.nationality || "N/A"}</td>
                        <td>${fields.colleges || "N/A"}</td>
                        <td>${fields.number_of_students || "N/A"}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                displayNoRecordsMessage("No records found matching the criteria.");
            }
        } else {
            displayNoRecordsMessage("No records found in the API response.");
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);

        // Display an error message in the table
        const tableBody = document.getElementById("data-table");
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Error fetching data: ${error.message}</td>
            </tr>
        `;
    }
}

function displayNoRecordsMessage(message) {
    const tableBody = document.getElementById("data-table");
    tableBody.innerHTML = `
        <tr>
            <td colspan="6">${message}</td>
        </tr>
    `;
}

// Fetch and display data when the page loads
window.onload = getData;
