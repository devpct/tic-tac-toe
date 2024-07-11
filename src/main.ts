import { findBestMove } from "./components/minimax";

const boxs: HTMLDivElement[] = Array.from(document.querySelectorAll("td"))!;
const twoPlayersButton: HTMLButtonElement = document.getElementById(
  "two-players"
) as HTMLButtonElement;
const playAgainstBotButton: HTMLButtonElement = document.getElementById(
  "play-against-bot"
) as HTMLButtonElement;
const playerX: HTMLElement = document.getElementById("playerX")!;
const playerO: HTMLElement = document.getElementById("playerO")!;

let gameMode: string = "two-players";
let botMoving: boolean = false;

enum playerIcon {
  player1 = "/images/multiplied.png",
  player2 = "/images/circle.png",
}

class Render {
  private counter: number = 0;
  private status: string = "";

  private initializeGame() {
    boxs.forEach((box) =>
      box.addEventListener("click", () => {
        if (box.innerHTML === "" && this.status === "" && !botMoving) {
          this.handleBoxClick(box);
        }
      })
    );
  }

  private handleBoxClick(box: HTMLDivElement) {
    const icon = document.createElement("img");
    icon.style.width = '50%'
    if (this.counter % 2 === 0) {
      icon.src = playerIcon.player1;
      box.style.backgroundColor = "#dc685a";
      icon.classList.add("X");
    } else {
      icon.src = playerIcon.player2;
      box.style.backgroundColor = "#ecaf4f";
      icon.classList.add("O");
    }
    box.appendChild(icon);
    this.counter++;
    this.checkWin(boxs);
    this.checkEqual();

    if (
      this.status === "" &&
      this.counter % 2 !== 0 &&
      gameMode === "play-against-bot"
    ) {
      // If the game is not over and it's the bot's turn
      botMoving = true;
      setTimeout(() => this.handleBotMove(), 100);
    }
  }

  private handleBotMove() {
    const bestMove = findBestMove(boxs ,playerIcon);
    const icon = document.createElement("img");
    if (bestMove !== -1) {
      const box = boxs[bestMove];
      icon.src = playerIcon.player2;
      box.style.backgroundColor = "#ecaf4f";
      icon.classList.add("O");
      box.appendChild(icon);
      this.counter++;
      this.checkWin(boxs);
      this.checkEqual();
    }
    botMoving = false;
  }

  private checkEqual() {
    if (this.counter === 9 && this.status === "") {
      this.status = "Equal";
      this.resetGame(boxs);
    }
  }

  private setupModeSelection() {
    twoPlayersButton.addEventListener("click", () => {
      gameMode = "two-players";
      twoPlayersButton.className = "button-show";
      playAgainstBotButton.className = "button-default";
      this.resetGame(boxs);
    });

    playAgainstBotButton.addEventListener("click", () => {
      gameMode = "play-against-bot";
      playAgainstBotButton.className = "button-show";
      twoPlayersButton.className = "button-default";
      this.resetGame(boxs);
    });
  }

  public startGame() {
    this.initializeGame();
    this.setupModeSelection();
  }

  private checkWin(boxs: HTMLDivElement[]) {
    const winConditions: (string | number)[][][] = [
      [
        ["", 0],
        ["", 1],
        ["", 2],
      ],
      [
        ["", 3],
        ["", 4],
        ["", 5],
      ],
      [
        ["", 6],
        ["", 7],
        ["", 8],
      ],
      [
        ["", 0],
        ["", 3],
        ["", 6],
      ],
      [
        ["", 1],
        ["", 4],
        ["", 7],
      ],
      [
        ["", 2],
        ["", 5],
        ["", 8],
      ],
      [
        ["", 0],
        ["", 4],
        ["", 8],
      ],
      [
        ["", 2],
        ["", 4],
        ["", 6],
      ],
    ];

    // Update win conditions
    winConditions.forEach((condition) => {
      condition.forEach((cond) => {
        const box = boxs[cond[1] as number];

        if (box.innerHTML !== "") {
          cond[0] = String((box.firstChild as Element)?.getAttribute("class"));
        }
      });
    });

    // Check win condition
    winConditions.forEach((condition) => {
      if (
        condition[0][0] === condition[1][0] &&
        condition[1][0] === condition[2][0] &&
        condition[0][0] !== ""
      ) {
        const winner = condition[0][0];
        if (this.status === "") {
          if (winner === "X") {
            playerX.innerHTML = String(+playerX.innerHTML + 1);
            this.status = "Player X : WIN";
          } else if (winner === "O") {
            playerO.innerHTML = String(+playerO.innerHTML + 1);
            this.status = "Player O : WIN";
          }
        }

        // Highlight the winning condition
        condition.forEach((cond) => {
          const position = boxs[cond[1] as number];
          position.style.backgroundColor = "#424769";
        });

        this.resetGame(boxs);
      }
    });
  }

  private resetGame(boxs: HTMLDivElement[]) {
    setTimeout(() => {
      boxs.forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
        box.style.color = "";
      });
      if (this.status !== "") {
        alert(this.status);
      }
      this.counter = 0;
      this.status = "";
    }, 20);
  }
}

const tictactoe = new Render();
tictactoe.startGame();