let currentPage = 1;
const pageSize = 12; // Adjust the number of quotes per page

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
  const quoteGrid = document.getElementById("quoteGrid");
  quoteGrid.innerHTML = ""; // Clear existing quotes

  quotesForPage.forEach((quote) => {
    const quoteElement = createQuoteElement(quote);
    quoteGrid.appendChild(quoteElement);
  });
}

// Function to create a quote element
function createQuoteElement(quote) {
  const quoteElement = document.createElement("div");
  quoteElement.classList.add("col-md-4", "mb-4");
  quoteElement.innerHTML = `
    <div class="card rounded-2">
      <div class="card-body">
        <p class="card-text font-monospace">"${quote}"</p>
      </div>
    </div>
  `;
  quoteElement.addEventListener("click", () => displayModal(quote));
  return quoteElement;
}

// Function to display modal with the clicked quote
function displayModal(quote) {
  const modalBody = document.getElementById("quoteModalBody");
  modalBody.textContent = quote;
  const modal = new bootstrap.Modal(document.getElementById("quoteModal"));
  modal.show();
}

// Function to load the next page of quotes
async function loadNextPage() {
  currentPage++;
  await displayQuotesForPage();
}

// Initial load
displayQuotesForPage();

let doctitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Thoughts - Come back!";
});
window.addEventListener("focus", () => {
  document.title = doctitle;
});
