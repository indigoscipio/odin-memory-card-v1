import React, { useEffect } from "react";
import Card from "./Card";
import data from "../data";

function Main() {
  let [cardData, setCardData] = React.useState(data);
  let [game, setGame] = React.useState({
    playerScore: [0],
    highScore: 0,
    start: false,
  });

  function initGame() {
    if (!game.start) {
      setGame((prevState) => {
        shuffleCard(cardData);
        return {
          ...prevState,
          start: true,
        };
      });
    }
  }
  initGame();

  function increasePlayerScore() {
    setGame((prevState) => {
      console.log(prevState.playerScore);
      return {
        ...prevState,
        playerScore: [
          ...prevState.playerScore,
          prevState.playerScore[prevState.playerScore.length - 1] + 1,
        ],
      };
    });
  }

  function handleHighScore() {
    console.log("High score handlded");
    setGame((prevState) => {
      console.log(game, prevState);
      return {
        ...prevState,
        highScore: Math.max(...prevState.playerScore),
      };
    });
  }

  // function handleHighScore() {
  //   console.log("High score handlded");
  //   setGame((prevState) => {
  //     console.log(game, prevState);
  //     return {
  //       ...prevState,
  //       highScore:
  //         game.playerScore > prevState.playerScore
  //           ? game.playerScore
  //           : prevState.playerScore,
  //     };
  //   });
  // }

  function resetPlayerScore() {
    setGame((prevState) => {
      return {
        ...prevState,
        playerScore: [...prevState.playerScore, 0],
      };
    });
  }

  function resetData() {
    setCardData((prevState) => {
      return shuffleCard(data);
    });
  }

  function shuffleCard(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function handleClick(e, id) {
    // console.log("clicked!", id);

    setCardData((prevState) => {
      let newCard = prevState.map((item) => {
        if (item.id == id) {
          console.log(`Clicked on ${item.emoji}`);

          if (item.isClicked) {
            resetData();
            resetPlayerScore();
            handleHighScore();
          } else {
            increasePlayerScore();
            return { ...item, isClicked: !item.isClicked };
          }
        }
        return { ...item };
      });
      return shuffleCard([...newCard]);

      // console.log(prevState.id, id);
      // return { ...prevState, isClicked: !prevState.isClicked };
    });
  }

  return (
    <div className="main">
      <div className="main__score">
        <h3 className="score__your-score">
          Your Score: {game.playerScore[game.playerScore.length - 1]}
        </h3>
        <h3 className="score__high-score">High Score: {game.highScore}</h3>
      </div>

      <div className="main__card-content">
        {cardData.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              item={item}
              onClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Main;
