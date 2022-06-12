import { useState } from "react";
import { isValidSudoku, resultBoard, solveSudoku } from "./sudoku-algorithm";

const SudokuBoard = () => {
  const BOARD_SIZE = 9;
  const BOARD = Array.from(Array(BOARD_SIZE).fill(0), () =>
    new Array(BOARD_SIZE).fill(0)
  );
  const [board, setBoard] = useState(BOARD);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInput = (e, rowIdx, colIdx) => {
    const newBoard = [...board];
    let number = +e.target.value;
    const MOD = 10;
    newBoard[rowIdx][colIdx] = (+number + MOD) % MOD;
    setBoard(newBoard);
  };

  const handleSubmit = () => {
    let flag = false;
    setDisable(true);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0) {
          if (!isValidSudoku(board)) {
            setMessage("Invalid Sudoku. Sorry, can't be solved!");
            setSuccess(false);
            flag = true;
            return;
          }
        }
      }
    }
    if (!flag) {
      solveSudoku(board, 0, 0);
      setTimeout(() => {
        if (resultBoard.length > 0) {
          setSuccess(true);
          setBoard(resultBoard);
          setMessage("Congratulations, Solved successfully !");
        }
      }, 200);
    }
  };

  const handleReset = () => {
    setBoard(BOARD);
    setDisable(false);
    setSuccess(false);
    setMessage("");
  };

  const displayBackgroundConditions = (
    subMatrixRowStart,
    submatrixColStart
  ) => {
    return (
      (subMatrixRowStart === 0 &&
        (submatrixColStart === 0 || submatrixColStart === 2)) ||
      (subMatrixRowStart === 2 &&
        (submatrixColStart === 0 || submatrixColStart === 2)) ||
      (subMatrixRowStart === 1 && submatrixColStart === 1)
    );
  };

  return (
    <div className="container">
      <div className="header">Sudoku Solver</div>
      <div className="container">
        {board?.map((col, rowIdx) => {
          return col.map((_, colIdx) => {
            let subMatrixRowStart = Math.floor(rowIdx / 3);
            let submatrixColStart = Math.floor(colIdx / 3);
            return (
              <div className="grid" key={rowIdx + "#" + colIdx}>
                <input
                  min="0"
                  max="9"
                  type="number"
                  // maxLength="1"
                  value={
                    board[rowIdx][colIdx] === 0 ? "0" : +board[rowIdx][colIdx]
                  }
                  className={
                    displayBackgroundConditions(
                      subMatrixRowStart,
                      submatrixColStart
                    )
                      ? "odd-rows"
                      : ""
                  }
                  onChange={(e) => handleInput(e, rowIdx, colIdx)}
                />
              </div>
            );
          });
        })}

        <div className={success ? "success message" : "failure message"}>
          {message}
        </div>

        <div className="sudoku-btns">
          <button
            className={disable ? "disable" : "solve"}
            disabled={disable}
            onClick={() => handleSubmit()}
          >
            Solve
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SudokuBoard;
