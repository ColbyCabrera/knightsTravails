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
    start[0] < 0 ||
    start[0] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[1] < 0 ||
    end[1] > 7
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
      console.log(visited.has(move.toString()));
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

  let legalMoves = allMoves.filter((arr) => {
    let inbounds0 = arr[0] >= 0 && arr[0] < 8;
    let inbounds1 = arr[1] >= 0 && arr[1] < 8;

    return inbounds0 && inbounds1;
  });

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

console.log(knightMoves([3, 3], [4, 3]));
