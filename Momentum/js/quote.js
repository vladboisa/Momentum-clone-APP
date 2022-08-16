const quoteElem = document.querySelector(".quote");
const authorElem = document.querySelector(".author");
const quoteErrElem = document.querySelector(".quote-error");
const changeQuote = document.querySelector(".change-quote");

async function getQuote() {
  try {
    const res = await fetch("https://favqs.com/api/qotd");
    const data = await res.json();
    quoteElem.innerHTML = `${data.quote.body}`;
    quoteElem.setAttribute("cite", `${data.quote.url}`);
    authorElem.innerHTML = `&mdash; ${data.quote.author}`;
    quoteErrElem.textContent = ``;
    quoteErrElem.classList.remove("error");
  } catch (err) {
    quoteErrElem.textContent = `Connection error for QuotesAPI`;
    quoteErrElem.classList.add("error");
    console.error(err);
  }
}
changeQuote.addEventListener("click", getQuote);
getQuote();
