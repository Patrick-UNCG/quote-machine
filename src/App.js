import React from 'react';
import './App.css';

function App(){
  const [quoteData, setQuoteData]= React.useState("")
  const randomNumber= Math.floor(Math.random() * 102)
  const [count,setCount]=React.useState(0)
  let tweet =   ''
  React.useEffect(()=>{
    function trimValues(arr) {
        const newArr = [];
        arr.forEach((element) => {
          newArr.push({
            quote:element.quote,
            author:element.author
          });
        });
        return newArr;
      }   fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
          .then(res => res.json())
          .then(data => setQuoteData(trimValues(data.quotes)))
    }, [count])

   if(quoteData!==""){
     tweet= 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + quoteData[randomNumber].quote + '" ' + quoteData[randomNumber].author)
   }

  function changeQuote(){
    setCount(count+1)
  }
  
  
  return  (quoteData!=="" ? 
           <div id ="quote-box">
             <div id="quote-container">
               <p id="text"><i class="fa fa-quote-left"></i> {quoteData[randomNumber].quote} <i class="fa fa-quote-right"></i></p>
                <p id="author">- {quoteData[randomNumber].author}</p>
                <button id="new-quote" onClick={changeQuote}>New quote</button>
             </div>
        <a id="tweet-quote" href={tweet} target="_top"><i class="fab fa-twitter"></i></a>
      </div> : <h3>Loading...</h3>
    ) 
}

export default App;
