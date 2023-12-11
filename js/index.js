let currentPage = 1;
let pageSize = 15; // Adjust the number of quotes per page
let quotes = [];

// Function to fetch quotes from the text file for a specific page
async function fetchQuotesForPage(page) {
    const response = await fetch("./assets/Thoughts.txt");
    const text = await response.text();
    const allQuotes = text.split("\n").filter((quote) => quote.trim() !== "");
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allQuotes.slice(startIndex, endIndex);
}

// Function to display quotes for the current page
async function displayQuotesForPage() {
    const quotesForPage = await fetchQuotesForPage(currentPage);

    quotesForPage.forEach(quote => {
        const quoteElement = document.createElement("div");
        quoteElement.classList.add("col-md-4", "mb-4");
        quoteElement.innerHTML = `
            <div class="card rounded-2">
                <div class="card-body">
                    <p class="card-text">${quote}</p>
                </div>
            </div>
        `;

        // Add the quote to the grid
        document.getElementById("quoteGrid").appendChild(quoteElement);
    });
}

// Function to load the next page of quotes
async function loadNextPage() {
    currentPage++;
    document.getElementById("quoteGrid").innerHTML = ""; // Clear existing quotes
    await displayQuotesForPage();
}

// Initial load
displayQuotesForPage();