class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.moves = null;
  }
}

function knightMoves(start, end) {
  if (arraysEqual(start, end)) return "Same square.";
  if (
    isOutOfBounds(start[0]) ||
    isOutOfBounds(end[0]) ||
    isOutOfBounds(start[1]) ||
    isOutOfBounds(end[1])
  ) {
    return "Coordinates out of bounds.";
  }

  let path = [];
  let queue = [];
  let found = false;

  currentNode = new Node(start);
  currentNode.moves = legalMoves(start).map((move) => {
    let child = new Node(move);
    child.prev = currentNode;
    return child;
  });

  let visited = new Set([currentNode.data.toString()]);
  while (currentNode.moves != null && !found) {
    // Check each move to see if it is the target
    currentNode.moves.forEach((move) => {
      queue.push(move);
      visited.add(move.data.toString());
      if (arraysEqual(move.data, end)) {
        found = true;

        while (move.prev != null) {
          path.push(move.data);
          move = move.prev;
        }

        path = [start, ...path.reverse()];
      }
    });

    // Prepare next iteration by getting moves
    currentNode = queue.shift();
    let nonVisited = legalMoves(currentNode.data).filter((move) => {
      return !visited.has(move);
    });

    currentNode.moves = nonVisited.map((move) => {
      let child = new Node(move);
      child.prev = currentNode;
      return child;
    });
  }

  let string =
    "You made it in " + (path.length - 1) + " moves!" + " Here's your path: \n";
  path.forEach((move) => {
    string += move + "\n";
  });
  return string;
}

function legalMoves(square) {
  let allMoves = [
    [square[0] + 1, square[1] + 2],
    [square[0] + 2, square[1] + 1],
    [square[0] + 2, square[1] - 1],
    [square[0] + 1, square[1] - 2],
    [square[0] - 1, square[1] - 2],
    [square[0] - 2, square[1] - 1],
    [square[0] - 2, square[1] + 1],
    [square[0] - 1, square[1] + 2],
  ];

  let legalMoves = allMoves.filter(
    (arr) => !isOutOfBounds(arr[0]) && !isOutOfBounds(arr[1])
  );

  return legalMoves;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function isOutOfBounds(coord) {
  return coord < 0 || coord > 7;
}

console.log(knightMoves([3, 3], [4, 3]));