<script lang="ts">
    import "../app.css"
    import Board from "../components/Board.svelte";
    import { empty_board } from '../assets/Gen_Grid';

    let grid: number[][] = empty_board()
    grid[12][4] = 11;
    grid[12][5] = 11;
    grid[11][4] = 11;
    grid[11][5] = 11;
    function  onKeyDown(e: KeyboardEvent) {
        console.log(e)
        if (e.key === 'ArrowLeft') {
            shiftLeft()
        } else if (e.key === 'ArrowRight') {
            shiftRight()
        }
    }

    function checkSpace(x: number, y:number, g: number[][]) {
        return !(x < 0 || x > 9 || y > 19 || g[y][x] !== 0);
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
            grid = temp;
        }
        setTimeout(drop, 100)
    }

    function shiftLeft() {
        let temp = empty_board()
        base:
        for (let j = 0; j < 10; j++) {
            for (let i = 19; i >= 0; i--) {
                if (grid[i][j] > 10) {
                    if (checkSpace(j-1, i, temp)) {
                        temp[i][j - 1] = grid[i][j];
                        temp[i][j] = 0;
                    } else {
                        temp = grid
                        break base;
                    }
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        grid = temp;
    }

    function shiftRight() {
        let temp = empty_board()
        base:
        for (let j = 9; j >= 0; j--) {
            for (let i = 19; i >= 0; i--) {
                if (grid[i][j] > 10) {
                    if (checkSpace(j+1, i, temp)) {
                        temp[i][j + 1] = grid[i][j];
                        temp[i][j] = 0;
                    } else {
                        temp = grid
                        break base;
                    }
                } else {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        grid = temp;
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
        if (!(checkSpace(4, 0, temp) && checkSpace(5, 0, temp) && checkSpace(4, 1, temp) && checkSpace(5, 1, temp))) {
            temp = empty_board();
        }
        temp[0][4] = 11;
        temp[0][5] = 11;
        temp[1][4] = 11;
        temp[1][5] = 11;
        grid = temp;
    }


    setTimeout(drop, 1500);

</script>


<div class="flex bg-background w-screen h-full overflow-y-clip m-0 items-center justify-center">
    <Board grid={grid}></Board>
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />


