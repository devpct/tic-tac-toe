import "./style.scss";
import { checkWin } from "./checkWin";
import { resetGame } from "./resetGame";
import { state, updateCounter, updateStatus } from "./components/states";
import { findBestMove } from "./components/minimax";

const boxs: HTMLDivElement[] = Array.from(document.querySelectorAll("td"))!;
const twoPlayersButton: HTMLButtonElement = document.getElementById("two-players") as HTMLButtonElement;
const playAgainstBotButton: HTMLButtonElement = document.getElementById("play-against-bot") as HTMLButtonElement;
let gameMode: string = "two-players";
let botMoving: boolean = false;

enum playerIcon {
  player1 = "X",
  player2 = "O",
}

class Render {
  constructor() {
    this.initializeGame();
    this.setupModeSelection();
  }

  initializeGame() {
    boxs.forEach((box) =>
      box.addEventListener("click", () => {
        if (box.innerHTML === "" && state.status === "" && !botMoving) {
          this.handleBoxClick(box);
        }
      })
    );
  }

  handleBoxClick(box: HTMLDivElement) {
    box.innerHTML =
      state.counter % 2 === 0 ? playerIcon.player1 : playerIcon.player2;
    updateCounter(state.counter + 1);
    checkWin(boxs, playerIcon);
    this.checkEqual();

    if (state.status === "" && state.counter % 2 !== 0 && gameMode === "play-against-bot") {
      // If the game is not over and it's the bot's turn
      botMoving = true;
      setTimeout(() => this.handleBotMove(), 100);
    }
  }

  handleBotMove() {
    const bestMove = findBestMove(boxs, playerIcon);
    if (bestMove !== -1) {
      const box = boxs[bestMove];
      box.innerHTML = playerIcon.player2; // Bot is always "O"
      updateCounter(state.counter + 1);
      checkWin(boxs, playerIcon);
      this.checkEqual();
    }
    botMoving = false;
  }

  checkEqual() {
    if (state.counter === 9 && state.status === "") {
      updateStatus("Equal");
      resetGame(boxs);
    }
  }

  setupModeSelection() {
    twoPlayersButton.addEventListener("click", () => {
      gameMode = "two-players";
      twoPlayersButton.style.backgroundColor = 'black'
      twoPlayersButton.style.color = 'white'
      playAgainstBotButton.style.backgroundColor = 'white'
      playAgainstBotButton.style.color = 'black'
      resetGame(boxs);
    });

    playAgainstBotButton.addEventListener("click", () => {
      gameMode = "play-against-bot";
      playAgainstBotButton.style.backgroundColor = 'black'
      playAgainstBotButton.style.color = 'white'
      twoPlayersButton.style.backgroundColor = 'white'
      twoPlayersButton.style.color = 'black'
      resetGame(boxs);
    });
  }
}

new Render();
