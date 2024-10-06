<script lang="ts">
    import "../app.css"
    import Board from "../components/Board.svelte";
    import { empty_board } from '../assets/Gen_Grid';
    import { pieces } from '../components/pieces';

    let grid: number[][] = empty_board()
    grid[12][4] = 11;
    grid[12][5] = 11;
    grid[11][4] = 11;
    grid[11][5] = 11;

    let pieceKey: number = 0;
    let heldPiece = -1;
    let rotation: number = 0;
    let globalX: number = 5;
    let globalY: number = 1;
    let futurePieces = [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6];
    let index = 0;
    let shiftDirection = 0;
    let shiftWeight = 10;

    function setFuturePieces() {
        for (let i = 0; i < 7; i++) {
            futurePieces[i] = futurePieces[i+7]
        }
        let tempArray = [0, 1, 2, 3, 4, 5, 6];
        for (let i = 0; i < 7; i++) {
            const tempIndex = Math.floor(Math.random() * 7);
            const temp = tempArray[tempIndex];
            tempArray[tempIndex] = tempArray[i];
            tempArray[i] = temp;
        }
        for (let i = 0; i < 7; i++) {
            futurePieces[i + 7] = tempArray[i]
        }
    }
    setFuturePieces();
    setFuturePieces();

    function steadyShift() {
        if (shiftDirection !== 0) {
            if (shiftWeight > 0){
                shiftWeight--;
            } else {
                shiftDirection === 1 ? shiftRight() : shiftLeft();
            }
        }
        setTimeout(steadyShift, 40);
    }

    function  onKeyDown(e: KeyboardEvent) {
        console.log(e)
        if (e.key === 'ArrowLeft') {
            shiftLeft();
            shiftDirection = -1;
            shiftWeight = 5;
        }
        if (e.key === 'ArrowRight') {
            shiftRight();
            shiftDirection = 1;
            shiftWeight = 5;
        }
        if (e.key === 'ArrowUp') {
            rotate(1);
        }
        if (e.key === 'z') {
            rotate(-1);
        }
        if (e.key === 'c') {
            hold();
        }
        if (e.key === ' ') {
            hardDrop();
        }
    }

    function  onKeyUp(e: KeyboardEvent) {
        console.log('test')
        if (e.key === 'ArrowLeft') {
            shiftDirection = 0;
            shiftWeight = 5;
        }
        if (e.key === 'ArrowRight') {
            shiftDirection = 0;
            shiftWeight = 5;
        }
    }

    function hold() {
        console.log('held')
        if (heldPiece === -1) {
            heldPiece = pieceKey;
        } else {
            const temp = heldPiece;
            heldPiece = pieceKey
            futurePieces[index] = temp;
            index--;
        }
        let temp = empty_board()
        for (let i = 19; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                if (grid[i][j] > 10) {
                    temp[i][j] = 0;
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        index++;
        if (index > 6) {
            index = 0;
            setFuturePieces();
        }
        pieceKey = futurePieces[index];
        rotation = 0;
        temp[pieces[pieceKey].coordinates[0][0].y + 1][pieces[pieceKey].coordinates[0][0].x + 5] = 11 + pieceKey;
        temp[pieces[pieceKey].coordinates[0][1].y + 1][pieces[pieceKey].coordinates[0][1].x + 5] = 11 + pieceKey;
        temp[pieces[pieceKey].coordinates[0][2].y + 1][pieces[pieceKey].coordinates[0][2].x + 5] = 11 + pieceKey;
        temp[pieces[pieceKey].coordinates[0][3].y + 1][pieces[pieceKey].coordinates[0][3].x + 5] = 11 + pieceKey;
        globalX = 5;
        globalY = 1;
        grid = temp;
    }
    function checkSpace(x: number, y:number, g: number[][]) {
        if (x < 0 || x > 9 || y > 19) {return false;}
        return !(g[y][x] !== 0 && g[y][x] < 10);
    }

    function drop() {
        let temp = empty_board();
        let d = true;
        base:
        for (let i = 19; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                if (grid[i][j] > 10) {
                    if (checkSpace(j, i+1, temp)) {
                        temp[i + 1][j] = grid[i][j];
                        temp[i][j] = 0;
                    } else {
                        d = false;
                        spawnNewPiece();
                        break base;
                    }
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        if (d) {
            globalY++;
            grid = temp;
        }
        return d;
    }

    function hardDrop() {
        while (drop()){}
    }
    function gravity() {
        drop();
        setTimeout(gravity, 200);
    }

    function shiftLeft() {
        let temp = empty_board()
        let update = true;
        base:
        for (let j = 0; j < 10; j++) {
            for (let i = 19; i >= 0; i--) {
                if (grid[i][j] > 10) {
                    if (checkSpace(j-1, i, temp)) {
                        temp[i][j - 1] = grid[i][j];
                        temp[i][j] = 0;
                    } else {
                        update = false;
                        break base;
                    }
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        if (update) {
            grid = temp;
            globalX--;
        }
    }

    function shiftRight() {
        let temp = empty_board()
        let update = true;
        base:
        for (let j = 9; j >= 0; j--) {
            for (let i = 19; i >= 0; i--) {
                if (grid[i][j] > 10) {
                    if (checkSpace(j+1, i, temp)) {
                        temp[i][j + 1] = grid[i][j];
                        temp[i][j] = 0;
                    } else {
                        update = false;
                        break base;
                    }
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        if (update) {
            grid = temp;
            globalX++;
        }
    }

    function spawnNewPiece() {
        let temp = empty_board()
        for (let i = 19; i >= 0; i--) {
            for (let j = 0; j < 10; j++) {
                if (grid[i][j] > 10) {
                    temp[i][j] = grid[i][j] - 10;
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        temp = checkRows(temp);
        if (!(checkSpace(4, 0, temp) && checkSpace(5, 0, temp) && checkSpace(4, 1, temp) && checkSpace(5, 1, temp))) {
            temp = empty_board();
            heldPiece = -1
        }
        index++;
        if (index > 6) {
            index = 0;
            setFuturePieces();
        }
        pieceKey = futurePieces[index];
        rotation = 0;
        temp[pieces[pieceKey].coordinates[0][0].y + 1][pieces[pieceKey].coordinates[0][0].x + 5] = 11 + pieceKey;
        temp[pieces[pieceKey].coordinates[0][1].y + 1][pieces[pieceKey].coordinates[0][1].x + 5] = 11 + pieceKey;
        temp[pieces[pieceKey].coordinates[0][2].y + 1][pieces[pieceKey].coordinates[0][2].x + 5] = 11 + pieceKey;
        temp[pieces[pieceKey].coordinates[0][3].y + 1][pieces[pieceKey].coordinates[0][3].x + 5] = 11 + pieceKey;
        globalX = 5;
        globalY = 1;
        grid = temp;
    }

    function clearRow(row: number, g: number[][]): number[][] {
        let temp = g;
        for (let i = row; i > 0; i--) {
            for (let j = 0; j < 10; j++) {
                temp[i][j] = temp[i-1][j];
            }
        }
        for (let j = 0; j < 10; j++) {
            temp[0][j] = 0;
        }
        return temp;
    }

    function checkRows(g: number[][]): number[][] {
        let temp = g;
        for (let i = 19; i >= 0; i--) {
            let clear = true
            for (let j = 0; j < 10; j++) {
                if (g[i][j] === 0) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                temp = clearRow(i, temp);
                i++;
            }
        }
        return temp;
    }

    function rotate(direction: number) {
        let temp = empty_board()
        let update = true;
        for (let j = 9; j >= 0; j--) {
            for (let i = 19; i >= 0; i--) {
                if (grid[i][j] < 10) {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        const r = (rotation + direction + 4)%4;
        for (let i = 0; i < 4; i++) {
            const x = pieces[pieceKey].coordinates[r][i].x + globalX;
            const y = pieces[pieceKey].coordinates[r][i].y + globalY;
            if (checkSpace(x, y, temp)) {
                temp[y][x] = pieceKey + 11;
            } else {
                update = false;
                break;
            }
        }
        if (update) {
            grid = temp;
            rotation = r;
        }
    }


    setTimeout(gravity, 1500);
    steadyShift();
</script>


<div class="flex bg-background w-screen h-full overflow-y-clip m-0 items-center justify-center">
    <Board grid={grid}></Board>
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup={onKeyUp}/>


