import "./App.css";
import { getAllCards } from "./utilities/getData";
import React, { useState, useEffect } from "react";
import NftCard from "./components/NftCard";

//SESSION STORAGE TO LOAD IF PREV SESSION EXISTS
const getSessionStorage= (key, defaultValue) =>{
  const stored = sessionStorage.getItem(key);
  if (!stored){
    return []
  }
  return JSON.parse(stored)
}

function App() {
  //STATE
  const [cards, setCards] = useState(getSessionStorage("sessionInfo", false));
  const [address, setAddress] = useState('');

  //GET ALL NFTs ON ADDRESS CHANGE OR RANDOM REQUEST
  useEffect(async () => {
    setCards(await getAllCards(address));
  }, [address]);

  //ADDRESS INPUT HANDLERS
  const handleChange = ((e) => {
    setAddress(e.target.value);
    console.log(address)
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddress(e.target.value);
    setCards (await getAllCards(address));
    console.log("address",address);
    setAddress('')
  }

//"RANDOM" ADDRESS

  const getRandom = async (e) => {
    let randArr=[
    'EB8fPDN5TrcmSqxmf663oXdcThy5x6Ne4HqmaqHfW8MV',
    '96LPGdkRfqQZm8fMvhDf3h625pkayZFjAw23V2hXUCqm',
    '9TKU3pPYXdWN93tjcwXLVP3KMcFmaDqWXJqfCDA6oKdo',
    '2LcB9Xnn5qfEpCxkHWu2UWz45sUykXQQkjQpDKaNapZZ'
    ]
    let randIndex= Math.floor(Math.random()*randArr.length)
    e.preventDefault();
    setAddress(randArr[randIndex])
    setCards (await getAllCards(address))
    // console.log('random', address)
  }


  //STAR LOGIC
  const toggleStar = (id) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        return card.id === id
          ? { ...card, isFavorite: !card.isFavorite }
          : card;
      });
    });
  }

  const clearStars = () => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        return { ...card, isFavorite: false };
      });
    });
  };


  //REORDER FAVORITES LOGIC
  const handleSortFav = () => {
    const sorted = [...cards].sort((a, b) =>{
      return a.isFavorite > b.isFavorite ? -1 : 1;
    })
    setCards(sorted)
  }

  //RENDER CARD
  const nftGallery = cards.map((item) => {
    return (
      <NftCard
        key={item.key}
        id={item.id}
        imgUrl={item.imageUrl}
        name={item.name}
        numEdition={item.numEdition}
        mint={item.mint}
        isFavorite={item.isFavorite}
        toggleStar={toggleStar}
        sortFavorites={handleSortFav}
      />
    );
  });

//SESSION INFO STORED ON CHANGE 

  useEffect(()=>{
    sessionStorage.setItem('sessionInfo', JSON.stringify(cards));
  },cards.isFavorite)

console.table(cards)

  return (
    <div className="App">
      <section className="search">
        <h2 className="title">NFT Viewer</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            onChange={handleChange}
            className="address"
            placeholder="enter a Solana address"
          ></input>
        </form>
        <a className = "randomText" onClick={getRandom}>or fetch random</a>
      </section>
      <section className="sort">
        {/* <div>
          <button className="btn sortBtns">sort by transaction time</button>
          <button className="btn sortBtns">sort by creation time</button>
        </div> */}
        {cards.some((card) => card.isFavorite === true) && (
          <div className="favoriteFunction">
            <button className="btn" onClick={clearStars}>
              clear favorites
            </button>
          </div>
        )}
      </section>
      <ol className="nftContainer">
        <li className="nfts">{nftGallery}</li>
      </ol>
    </div>
  );
}

export default App;
