## Random Quotes
To generate a **random quote** from a text file, you can use a random number generator to select a line from the file. By reading the text file line by line and storing each line in an array or list, you can then generate a random index within the range of the array's length. This index will correspond to a randomly chosen quote from the file. You can then display this quote to the user.


*Display initial quotes -*

     for (let i = 0; i < 9; i++) {
      displayRandomQuote();
     }
*Pagination -*

    let currentPage = 1;
    let pageSize = 15; // Adjust the number of quotes per page
    let quotes = [];

*Function to fetch quotes from the text file for a specific page -*

    async function fetchQuotesForPage(page) {
        const response = await fetch("./assets/Thoughts.txt");
        const text = await response.text();
        const allQuotes = text.split("\n").filter((quote) => quote.trim() !== "");
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return allQuotes.slice(startIndex, endIndex);
    }

*Function to load the next page of quotes -*

    async function loadNextPage() {
        currentPage++;
        document.getElementById("quoteGrid").innerHTML = ""; // Clear existing quotes
        await displayQuotesForPage();
    }

*Auto Dark mode (CSS) -*

    @media (prefers-color-scheme: dark) {
    body {
    background: #000;
    color: #e7f6f2;
     }

    .card {
    background: #000;
    color: #e7f6f2;
    border: 1px solid #ffffff20;
     }
    .card-text {
    background: #000;
    color: #e7f6f2;
     }
    }


---
![](./assets/Thoughts.png)