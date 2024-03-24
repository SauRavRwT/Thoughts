## Random Quotes

To generate a **random quote** from a text file, you can use a random number generator to select a line from the file. By reading the text file line by line and storing each line in an array or list, you can then generate a random index within the range of the array's length. This index will correspond to a randomly chosen quote from the file. You can then display this quote to the user.

_Pagination -_

    let currentPage = 1;
    let pageSize = 12;
    let quotes = [];

_Change File Path -_

    const response = await fetch("Your_file.pdf");

_Function to display quotes for the current page -_

    async function displayQuotesForPage() {
    const quotesForPage = await fetchQuotesForPage(currentPage);
    const quoteGrid = document.getElementById("quoteGrid");
    quoteGrid.innerHTML = "";

    quotesForPage.forEach((quote) => {
    const quoteElement = createQuoteElement(quote);
    quoteGrid.appendChild(quoteElement);
     });
    }

_Function to create a quote element -_

    quoteElement.innerHTML = `
    <div class="card rounded-2">
      <div class="card-body">
        <p class="card-text font-monospace">"${quote}"</p>
      </div>
    </div>
    `;
    
_Function to display modal with the clicked quote -_

    function displayModal(quote) {
    const modalBody = document.getElementById("quoteModalBody");
    modalBody.textContent = quote;
    const modal = new bootstrap.Modal(document.getElementById("quoteModal"));
    modal.show();
    }

_Function to load the next page of quotes -_

    async function loadNextPage() {
    currentPage++;
    await displayQuotesForPage();
    }

---

![](./assets/Thoughts.png)
