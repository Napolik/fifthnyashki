class Fifteen extends HTMLElement {
  constructor() {
    super();

    this.winCondition = [[1, 1], [2, 2], [3, 3], [4, 4],
      [5, 5], [6, 6], [7, 7], [8, 8],
      [9, 9], [10, 10], [11, 11], [12, 12],
      [13, 13], [14, 14], [15, 15], [0, 0]];

    this.currentState = [[[1, 1], [2, 2], [3, 3], [4, 4]],
      [[5, 5], [6, 6], [7, 7], [8, 8]],
      [[9, 9], [10, 10], [11, 11], [12, 12]],
      [[13, 13], [14, 14], [15, 15], [0, 0]]];

    this.init();
  }

  init() {
    this.drawTable();
    this.eventListener();
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
        cell.innerHTML = this.currentState[i][j][1];
        if (this.currentState[i][j][1] === 0) {
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

    let selectedCell = this.currentState[lineIndex][inlineIndex];
    let rightCell = this.currentState[lineIndex][inlineIndex + 1];
    let leftCell = this.currentState[lineIndex][inlineIndex - 1];
    let topCell = this.currentState[lineIndex - 1]?.[inlineIndex];
    let bottomCell = this.currentState[lineIndex + 1]?.[inlineIndex];

    switch (0) {
      case rightCell?.[1] :
        [this.currentState[lineIndex][inlineIndex + 1], this.currentState[lineIndex][inlineIndex]] = [selectedCell, rightCell];
        this.drawTable();
        break;
      case leftCell?.[1] :
        [this.currentState[lineIndex][inlineIndex - 1], this.currentState[lineIndex][inlineIndex]] = [selectedCell, leftCell];
        this.drawTable();
        break;
      case topCell?.[1] :
        [this.currentState[lineIndex - 1][inlineIndex], this.currentState[lineIndex][inlineIndex]] = [selectedCell, topCell];
        this.drawTable();
        break;
      case bottomCell?.[1] :
        [this.currentState[lineIndex + 1][inlineIndex], this.currentState[lineIndex][inlineIndex]] = [selectedCell, bottomCell];
        this.drawTable();
        break;
    }
  }

}

customElements.define('fifteen-game', Fifteen);
