import "./style.scss";
import { checkWin } from "./checkWin";
import { resetGame } from "./resetGame";
import { state, updateCounter, updateStatus } from "./components/states";

const boxs: HTMLDivElement[] = Array.from(document.querySelectorAll("td"))!;
enum playerIcon {
  player1 = "X",
  player2 = "O",
}

class Render {
  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    boxs.forEach((box) =>
      box.addEventListener("click", () => {
        if (box.innerHTML === "") {
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
  }

  checkEqual() {
    if (state.counter === 9 && state.status === "") {
      updateStatus("Equal");
      resetGame(boxs);
    }
  }
}

new Render();
