export type piece = {
  coordinates: coordinate[][];

}

export type coordinate = {
  x: number;
  y: number;
}

const O: piece = {
  coordinates: [
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}],
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}],
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}],
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: -1, y: -1}]
  ]
}

const I: piece = {
  coordinates: [
    [{x: 0, y: -1}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
    [{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}],
    [{x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: -1, y: 2}],
    [{x: -2, y: -1}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}]
  ]
}

const S: piece = {
  coordinates: [
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 1, y: -1}],
    [{x: 0, y: 0}, {x: 0, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: -1, y: -1}]
  ]
}

const Z: piece = {
  coordinates: [
    [{x: 0, y: 0}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: 0}],
    [{x: 0, y: 0}, {x: 1, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}]
  ]
}

const L: piece = {
  coordinates: [
    [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}],
    [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: -1}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}]
  ]
}

const J: piece = {
  coordinates: [
    [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: 1}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: -1}],
    [{x: 0, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: -1}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}]
  ]
}

const T: piece = {
  coordinates: [
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 1, y: 0}],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}],
    [{x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}]
  ]
}

export const pieces: piece[] = [O, T, I, S, Z, L, J];


