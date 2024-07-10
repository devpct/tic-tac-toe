import { resetGame } from "./resetGame";
import { updateStatus } from "./components/states";

const playerX: HTMLElement = document.getElementById("playerX")!;
const playerO: HTMLElement = document.getElementById("playerO")!;

export function checkWin(boxs: HTMLDivElement[], playerIcon: any) {
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
        cond[0] = box.innerHTML;
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
      if (winner === playerIcon.player1) {
        playerX.innerHTML = String(+playerX.innerHTML + 1);
        updateStatus("Player X : WIN");
      } else if (winner === playerIcon.player2) {
        playerO.innerHTML = String(+playerO.innerHTML + 1);
        updateStatus("Player O : WIN");
      }

      // Highlight the winning condition
      condition.forEach((cond) => {
        const position = boxs[cond[1] as number];
        position.style.backgroundColor = "green";
        position.style.color = "white";
      });

      resetGame(boxs);
    }
  });
}
