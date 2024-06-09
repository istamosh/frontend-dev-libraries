import React from "react";

/* const fetchQuotes = async () => {
  try {
    const fetched = await fetch(
      "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    return await fetched.json();
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  console.log(await fetchQuotes());
})(); */

const fetchQuotes = async () => {
  let fetched;

  const tryFetch = async () => {
    fetched = await fetch(
      "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    ); // Making the req
    return await fetched.json(); // parsing the response
  };

  while (!fetched.ok) {
    let timeOut = 5000;
    await tryFetch();
  }

  if (fetched.ok) {
    console.log(fetched);
  } else {
    while (!fetched.ok) {}
  }

  // if (fetched.ok) {
  //   console.log(fetched.ok);
  //   const error = new Error();
  //   return error; // return success object
  // } else {
  //   console.log("elsed");
  // }

  /* const responseError = {
    type: 'Error',
    message: result.message || 'Something went wrong',
    data: result.data || '',
    code: result.code || '',
  };

  const error = new Error();
  error.info = responseError;

  return (error); */
};

(async () => {
  console.log(await fetchQuotes());
})();

// fetch(
//   "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
// )
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result.quotes);
//     console.log(result.quotes.length);
//     console.log(`${result.quotes[0].quote}; ${result.quotes[0].author}`);
//   });

// async function wait() {
//   console.log(await item["quotes"]);
// }
// wait();

const App = () => (
  <div>
    <div id="quote-box">
      <p id="text">Quote Text</p>
      <p id="author">Quote Author</p>
      <button id="new-quote">New Quote</button>
      <a href="" id="tweet-quote" target="_blank">
        Tweet It!
      </a>
    </div>
  </div>
);

const RandomQuotes = () => {
  return (
    <fieldset>
      <legend>Random Quotes Generator Section</legend>
      <App />
    </fieldset>
  );
};

export default RandomQuotes;
