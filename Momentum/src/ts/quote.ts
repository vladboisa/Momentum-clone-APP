const quoteElem = document.querySelector(".quote");
const authorElem = document.querySelector(".author");
const quoteErrElem = document.querySelector(".quote-error");
const changeQuote = document.querySelector(".change-quote");

async function getQuote() {
  if (quoteElem && authorElem && quoteErrElem != undefined) {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();

      if (res.ok){
        quoteElem.textContent = `${data.quote}`;
        authorElem.textContent = `— ${data.author}`;
        quoteElem.setAttribute("cite", `https://dummyjson.com/quotes/${data.id}`);
        quoteErrElem.textContent = ``;
        quoteErrElem.classList.remove("error");

      }
      else {
        quoteErrElem.textContent = `${data.message}`;
      }
    } catch (err) {
      quoteErrElem.textContent = `Connection error for QuotesAPI`;
      quoteErrElem.classList.add("error");
    }
    }
}
changeQuote?.addEventListener("click", getQuote);
getQuote();
export {};