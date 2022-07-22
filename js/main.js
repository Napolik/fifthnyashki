class Fifteen extends HTMLElement {
  constructor() {
    super();

    this.winCondition = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
    this.currentState = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];

    this.init();
  }

  init() {
    this.currentState = this.shuffle();
    this.drawTable();
    this.eventListener();
    this.shuffle();
  }

  eventListener() {
    this.addEventListener('click', (e) => {
      const index = Array.from(e.target.parentNode.children).indexOf(e.target);
      this.moveCell(index);
    });
  }

  drawTable() {
    this.querySelector('.table').innerHTML = '';

    for (let i = 0; i < this.currentState.length; i++) {
      for (let j = 0; j < this.currentState[i].length; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = this.currentState[i][j];
        if (this.currentState[i][j] === 0) {
          cell.innerHTML = '';
        }
        this.querySelector('.table').append(cell);
      }
    }
  }

  moveCell(index) {
    const lineLength = this.currentState[0].length;
    const lineIndex = Math.floor(index / lineLength);
    const inlineIndex = index - lineIndex * lineLength;

    const selectedCell = this.currentState[lineIndex][inlineIndex];
    const rightCell = this.currentState[lineIndex][inlineIndex + 1];
    const leftCell = this.currentState[lineIndex][inlineIndex - 1];
    const topCell = this.currentState[lineIndex - 1]?.[inlineIndex];
    const bottomCell = this.currentState[lineIndex + 1]?.[inlineIndex];

    switch (0) {
      case rightCell :
        [this.currentState[lineIndex][inlineIndex + 1], this.currentState[lineIndex][inlineIndex]] = [selectedCell, rightCell];
        this.drawTable();
        break;
      case leftCell :
        [this.currentState[lineIndex][inlineIndex - 1], this.currentState[lineIndex][inlineIndex]] = [selectedCell, leftCell];
        this.drawTable();
        break;
      case topCell :
        [this.currentState[lineIndex - 1][inlineIndex], this.currentState[lineIndex][inlineIndex]] = [selectedCell, topCell];
        this.drawTable();
        break;
      case bottomCell :
        [this.currentState[lineIndex + 1][inlineIndex], this.currentState[lineIndex][inlineIndex]] = [selectedCell, bottomCell];
        this.drawTable();
        break;
    }
  }

  shuffle() {
    let singleArray = [];

    for (let i = 0; i < this.winCondition.length; i++) {
      for (let j = 0; j < this.winCondition[i].length; j++) {
        singleArray.push(this.winCondition[i][j]);
      }
    }

    const shuffledArray = this.shuffleSingle(singleArray);

    let cellArray = [];
    let resultArray = [];
    for (let cell = 0; cell < 16; cell++) {
      cellArray.push(shuffledArray[cell]);

      if (cellArray.length === 4) {
        resultArray.push(cellArray);
        cellArray = [];
      }
    }

    return resultArray;
  }

  shuffleSingle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}

customElements.define('fifteen-game', Fifteen);
