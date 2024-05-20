let currentPage = 1;
const pageSize = 12; // Adjust the number of quotes per page

// Function to fetch quotes from the text file for a specific page
async function fetchQuotesForPage(page) {
  const response = await fetch("./assets/Thoughts.txt");
  const text = await response.text();
  const allQuotes = text.split("\n").filter((quote) => quote.trim() !== "");
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const quotesForPage = allQuotes.slice(startIndex, endIndex);
  return { quotesForPage, totalQuotes: allQuotes.length };
}

// Function to display quotes for the current page
async function displayQuotesForPage() {
  const { quotesForPage, totalQuotes } = await fetchQuotesForPage(currentPage);
  if (quotesForPage.length === 0 && currentPage > 1) {
    // If no quotes are available and not on the first page, go back to page 1
    currentPage = 1;
    await displayQuotesForPage();
    return;
  }

  const quoteGrid = document.getElementById("quoteGrid");
  quoteGrid.innerHTML = ""; // Clear existing quotes

  quotesForPage.forEach((quote) => {
    const quoteElement = createQuoteElement(quote);
    quoteGrid.appendChild(quoteElement);
  });

  updatePaginationButtons(totalQuotes);
}

// Function to create a quote element
function createQuoteElement(quote) {
  const quoteElement = document.createElement("div");
  quoteElement.classList.add("col-md-4", "mb-4");
  quoteElement.innerHTML = `
    <div class="card rounded-4">
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
  const { quotesForPage } = await fetchQuotesForPage(currentPage);
  if (quotesForPage.length === 0) {
    // Reset to page 1 if no quotes are available
    currentPage = 1;
  }
  await displayQuotesForPage();
}

// Function to update pagination buttons based on total quotes
function updatePaginationButtons(totalQuotes) {
  const nextButton = document.getElementById("nextButton");
  const totalPages = Math.ceil(totalQuotes / pageSize);

  if (currentPage >= totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
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

// Adding event listener to the next button
document.getElementById("nextButton").addEventListener("click", loadNextPage);
