import { useEffect, useState } from "react";
import "./App.css";
import { pokemons } from "./api.js";
import { api } from "./api.js";
// function api(name) {
//   return `https://pokeapi.co/api/v2/pokemon/${name}/`;
// }

// let pokemons = [
//   "bulbasaur",
//   "ivysaur",
//   "venusaur",
//   "charmander",
//   "charmeleon",
//   "charizard",
//   "squirtle",
//   "wartortle",
//   "blastoise",
//   "caterpie",
//   "metapod",
//   "butterfree",
// ];

function ScoreBoard({ score, bestScore }) {
  return (
    <div className="score">
      <span>Score: {score} </span>
      <span>Best Score: {bestScore} </span>
    </div>
  );
}

function Banner({ score, bestScore }) {
  return (
    <div className="banner">
      <h1>Pokemon Memory Game!</h1>
      <ScoreBoard score={score} bestScore={bestScore}></ScoreBoard>
    </div>
  );
}

function Card({ src, title, onClickHandler }) {
  return (
    <div className="card" id={title} onClick={onClickHandler}>
      <img className="img" src={src}></img>
      <div className="cardTitle">{title}</div>
    </div>
  );
}

function Cards({ ClickHandler, pokeCards }) {
  return <div className="cardContainer">{pokeCards}</div>;
}

function Game() {
  let [pokemonData, setPokemonData] = useState([]);
  let [score, setScore] = useState(0);
  let [previousCard, setPreviousCard] = useState("");
  let [clickedCards, setClickedCards] = useState([]);
  let [bestscore, setBestScore] = useState(0);

  useEffect(() => {
    async function fetchPokemon() {
      let a = [];
      for (let i = 0; i < pokemons.length; i++) {
        let response = await fetch(api(pokemons[i]));
        let data = await response.json();

        let imgSrc = data.sprites.front_default;
        a.push({
          name: pokemons[i][0].toUpperCase() + pokemons[i].slice(1),
          src: imgSrc,
        });
      }
      setPokemonData(a);
    }
    fetchPokemon();
  }, []);

  let pokeCards = pokemonData.map((poke) => {
    return (
      <Card
        onClickHandler={(event) => ClickHandler(event, poke.name)}
        key={poke.name}
        title={poke.name}
        src={poke.src}
      ></Card>
    );
  });

  function ClickHandler(event, id) {
    let clickedAgain = clickedCards.some((card) => {
      if (id == card) return true;
    });
    if (clickedAgain) {
      setClickedCards([]);
      setScore(0);
    } else {
      setClickedCards([...clickedCards, id]);
      setScore((prev) => prev + 1);
    }
    if (score >= bestscore) setBestScore(score);
    setPokemonData((prev) => [...prev].sort(() => Math.random() - 0.5));
  }

  return (
    <>
      <Banner score={score} bestScore={bestscore}></Banner>
      <Cards pokeCards={pokeCards}></Cards>
    </>
  );
}

function App() {
  return <Game></Game>;
}

export default App;
