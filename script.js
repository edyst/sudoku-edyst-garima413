const easy = {
    question: [
      ["6", "-", "-", "-", "-", "-", "-", "7", "-"],
      ["-", "-", "-", "-", "-", "5", "-", "2", "-"],
      ["-", "-", "-", "-", "-", "1", "-", "-", "-"],
      ["3", "6", "2", "-", "-", "-", "-", "8", "1"],
      ["-", "-", "9", "6", "-", "-", "-", "-", "-"],
      ["7", "1", "-", "-", "9", "-", "4", "-", "5"],
      ["-", "2", "-", "-", "-", "6", "5", "1", "-"],
      ["-", "-", "7", "8", "-", "-", "-", "-", "3"],
      ["4", "5", "-", "-", "-", "-", "-", "-", "-"],
    ],
    answer: [
      ["6", "8", "5", "3", "2", "9", "1", "7", "4"],
      ["9", "7", "1", "4", "8", "5", "3", "2", "6"],
      ["2", "3", "4", "7", "6", "1", "8", "5", "9"],
      ["3", "6", "2", "5", "7", "4", "9", "8", "1"],
      ["5", "4", "9", "6", "1", "8", "7", "3", "2"],
      ["7", "1", "8", "2", "9", "3", "4", "6", "5"],
      ["8", "2", "3", "9", "4", "6", "5", "1", "7"],
      ["1", "9", "7", "8", "5", "2", "6", "4", "3"],
      ["4", "5", "6", "1", "3", "7", "2", "9", "8"],
    ],
  };
  
  const medium = {
    question: [
      ["-", "8", "-", "-", "-", "-", "1", "-", "-"],
      ["-", "-", "-", "-", "-", "5", "-", "2", "-"],
      ["-", "-", "-", "-", "-", "1", "-", "-", "-"],
      ["3", "6", "2", "-", "-", "-", "-", "8", "1"],
      ["-", "-", "9", "6", "-", "-", "-", "-", "-"],
      ["7", "1", "-", "-", "9", "-", "4", "-", "5"],
      ["-", "2", "-", "-", "-", "6", "5", "1", "-"],
      ["-", "-", "7", "8", "-", "-", "-", "-", "3"],
      ["4", "5", "-", "-", "-", "-", "-", "-", "-"],
    ],
    answer: [
      ["6", "8", "5", "3", "2", "9", "1", "7", "4"],
      ["9", "7", "1", "4", "8", "5", "3", "2", "6"],
      ["2", "3", "4", "7", "6", "1", "8", "5", "9"],
      ["3", "6", "2", "5", "7", "4", "9", "8", "1"],
      ["5", "4", "9", "6", "1", "8", "7", "3", "2"],
      ["7", "1", "8", "2", "9", "3", "4", "6", "5"],
      ["8", "2", "3", "9", "4", "6", "5", "1", "7"],
      ["1", "9", "7", "8", "5", "2", "6", "4", "3"],
      ["4", "5", "6", "1", "3", "7", "2", "9", "8"],
    ],
  };
  
  const hard = {
    question: [
      ["-", "1", "-", "5", "-", "-", "-", "-", "-"],
      ["-", "-", "9", "7", "-", "4", "2", "-", "-"],
      ["-", "-", "5", "-", "-", "-", "-", "7", "-"],
      ["5", "-", "-", "-", "3", "-", "-", "-", "7"],
      ["-", "6", "-", "-", "2", "-", "4", "1", "-"],
      ["-", "-", "8", "-", "-", "5", "-", "-", "-"],
      ["1", "-", "4", "-", "-", "-", "-", "-", "-"],
      ["2", "-", "3", "-", "-", "-", "-", "-", "9"],
      ["-", "7", "-", "-", "-", "-", "8", "-", "-"],
    ],
    answer: [
      ["7", "1", "2", "5", "8", "3", "6", "9", "4"],
      ["6", "3", "9", "7", "1", "4", "2", "5", "8"],
      ["8", "4", "5", "2", "6", "9", "1", "7", "3"],
      ["5", "2", "1", "4", "3", "6", "9", "8", "7"],
      ["3", "6", "7", "9", "2", "8", "4", "1", "5"],
      ["4", "9", "8", "1", "7", "5", "3", "2", "6"],
      ["1", "8", "4", "6", "9", "7", "5", "3", "2"],
      ["2", "5", "3", "8", "4", "1", "7", "6", "9"],
      ["9", "7", "6", "3", "5", "2", "8", "4", "1"],
    ],
  };
  
  //variables
  let selectedNum, selectedCell;
  let board, name, answer;
  
  function generateBoard(board) {
    console.log(board);
    clearPrevious();
    id("validate").classList.remove("hidden");
    id("restart").classList.remove("hidden");
    qs("h1").classList.add("hidden");
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let box = document.createElement("p");
  
        if (board[i][j] !== "-") {
          box.textContent = board[i][j];
          box.classList.add("background");
        } else {
          box.addEventListener("click", function () {
            selectedCell = this;
            for (let k = 0; k < 81; k++) {
              qsa(".box")[k].classList.remove("selected");
            }
            this.classList.add("selected");
            colorToRowColGrid(i, j);
          });
        }
  
        box.id = `${i}-${j}`;
        box.classList.add("box");
  
        if (j == 2 || j == 5) box.classList.add("rightBorder");
  
        if (i == 2 || i == 5) box.classList.add("bottomBorder");
  
        id("board").appendChild(box);
      }
    }
    id("board").classList.add("completeBorder");
  }
  
  document.body.addEventListener("keyup", (e) => {
    selectedNum = e.key;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] == selectedNum) {
          id(`${i}-${j}`).classList.add("all");
        }
      }
    }
    updateMove();
  });
  
  function updateMove() {
    for (let i = 0; i < 81; i++) {
      qsa(".box")[i].classList.remove("incorrectBox");
    }
    if (selectedCell && selectedNum === "Backspace") {
      selectedCell.textContent = "";
    }
  
    if (selectedCell && selectedNum && selectedNum >= 1 && selectedNum <= 9) {
      let [row, col] = selectedCell.id.split("-");
      selectedCell.textContent = selectedNum;
  
      if (checkCorrect(row, col, selectedNum)) {
        selectedCell.classList.add("background");
        selectedCell.classList.remove("incorrect");
        selectedCell.classList.add("blue");
      } else {
        selectedCell.classList.add("incorrect");
        selectedCell.classList.remove("background");
  
        for (let i = 0; i < 9; i++) {
          if (board[i][col] == selectedNum)
            id(`${i}-${col}`).classList.add("incorrectBox");
  
          if (board[row][i] == selectedNum)
            id(`${row}-${i}`).classList.add("incorrectBox");
  
          let r = 3 * Math.floor(row / 3) + Math.floor(i / 3);
          let c = 3 * Math.floor(col / 3) + Math.floor(i % 3);
  
          if (board[r][c] == selectedNum)
            id(`${r}-${c}`).classList.add("incorrectBox");
        }
      }
      board[row][col] = selectedNum;
      // selectedNum = null;
    }
  }
  
  function checkCorrect(row, col, num) {
    return answer[row][col] == num;
  }
  
  function colorToRowColGrid(row, col) {
    for (let i = 0; i < 81; i++) qsa(".box")[i].classList.remove("all");
  
    for (let i = 0; i < 9; i++) {
      id(`${i}-${col}`).classList.add("all");
      id(`${row}-${i}`).classList.add("all");
  
      let r = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      let c = 3 * Math.floor(col / 3) + Math.floor(i % 3);
  
      id(`${r}-${c}`).classList.add("all");
    }
  }
  
  function clearPrevious() {
    //access all the box
    let boxes = qsa(".box");
  
    //remove each box
    for (let i = 0; i < boxes.length; i++) boxes[i].remove();
  
    selectedCell = null;
    selectedNum = null;
  }
  
  //buttons
  id("easy").onclick = function () {
    board = easy.question;
    answer = easy.answer;
    generateBoard(board);
  };
  
  id("medium").onclick = function () {
    board = medium.question;
    answer = medium.answer;
    generateBoard(board);
  };
  
  id("hard").onclick = function () {
    board = hard.question;
    answer = hard.answer;
    generateBoard(board);
  };
  
  id("validate").onclick = function () {
    if (validate()) {
      alert("Good Job ");
    } else {
      alert("Something is not right !");
    }
  };
  
  function validate() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] != answer[i][j]) return false;
      }
    }
  
    return true;
  }
  
  id("restart").onclick = function () {
    clearPrevious();
    id("board").classList.remove("completeBorder");
    qs("h1").classList.remove("hidden");
    id("validate").classList.add("hidden");
    id("restart").classList.add("hidden");
  };
  
  //Helper functions
  function id(id) {
    return document.getElementById(id);
  }
  
  function qs(selector) {
    return document.querySelector(selector);
  }
  
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
  