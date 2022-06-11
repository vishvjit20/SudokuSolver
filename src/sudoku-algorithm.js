export let flag = false;
export let resultBoard = [];

export const solveSudoku = (board, i = 0, j = 0) => {
  if (i === 0 && j === 0) flag = false;
  if (j === board[0].length) {
    i++;
    j = 0;
  }

  if (flag) return;
  if (!flag && i === board.length) {
    console.log("Here nothing");
    flag = true;
    resultBoard = [];
    for (let row = 0; row < 9; row++) {
      let tempArr = [];
      for (let col = 0; col < 9; col++) {
        tempArr.push(board[row][col]);
      }
      resultBoard = [...resultBoard, tempArr];
    }
    return;
  }

  if (board[i][j] !== 0) solveSudoku(board, i, j + 1);
  else {
    for (let digit = 1; digit <= 9; digit++) {
      if (isValid(board, i, j, digit)) {
        board[i][j] = digit;
        solveSudoku(board, i, j + 1);
        board[i][j] = 0;
      }
    }
  }
};

export const isValidSudoku = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        let temp = board[i][j];
        board[i][j] = 0;
        let res = isValid(board, i, j, temp);
        board[i][j] = temp;
        if (!res) return false;
      }
    }
  }
  return true;
};

const isValid = (board, i, j, digit) => {
  // check in ith row
  for (let col = 0; col < 9; col++) if (board[i][col] === digit) return false;

  // check in jth col
  for (let row = 0; row < 9; row++) if (board[row][j] === digit) return false;

  // Submatrix Check
  let subMatrixRowStart = Math.floor(i / 3) * 3;
  let submatrixColStart = Math.floor(j / 3) * 3;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[subMatrixRowStart + row][submatrixColStart + col] === digit) {
        return false;
      }
    }
  }

  return true;
};
