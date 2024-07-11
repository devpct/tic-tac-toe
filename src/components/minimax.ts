export function minimax(newBoard: HTMLDivElement[], playerIcon: any, depth: number, isMaximizing: boolean, alpha: number, beta: number): number {
  const emptyIndexes = newBoard.filter(box => box.innerHTML === "").map(box => +box.dataset.index!);

  const checkWin = (board: HTMLDivElement[], player: string): boolean => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(condition => 
      condition.every(index => board[index].innerHTML === player)
    );
  };

  if (checkWin(newBoard, playerIcon.player1)) return -10 + depth;
  if (checkWin(newBoard, playerIcon.player2)) return 10 - depth;
  if (emptyIndexes.length === 0) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let index of emptyIndexes) {
      newBoard[index].innerHTML = playerIcon.player2;
      const score = minimax(newBoard, playerIcon, depth + 1, false, alpha, beta);
      newBoard[index].innerHTML = "";
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) {
        break; // Beta cut-off
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let index of emptyIndexes) {
      newBoard[index].innerHTML = playerIcon.player1;
      const score = minimax(newBoard, playerIcon, depth + 1, true, alpha, beta);
      newBoard[index].innerHTML = "";
      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) {
        break; // Alpha cut-off
      }
    }
    return bestScore;
  }
}

export function findBestMove(board: HTMLDivElement[], playerIcon: any): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  const emptyIndexes = board.filter(box => box.innerHTML === "").map(box => +box.dataset.index!);

  emptyIndexes.forEach(index => {
    board[index].innerHTML = playerIcon.player2;
    const score = minimax(board, playerIcon, 0, false, -Infinity, Infinity);
    board[index].innerHTML = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  });

  return bestMove;
}
