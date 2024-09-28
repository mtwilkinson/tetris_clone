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

    let index: number = 0;
    let rotation: number = 0;
    let globalX: number = 5;
    let globalY: number = 1;


    function  onKeyDown(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') {
            shiftLeft();
        } else if (e.key === 'ArrowRight') {
            shiftRight();
        } else if (e.key === 'ArrowUp') {
            rotate();
        }
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
        setTimeout(drop, 200)
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
        }
        index = Math.floor(Math.random() * 7);
        rotation = 0;
        temp[pieces[index].coordinates[0][0].y + 1][pieces[index].coordinates[0][0].x + 5] = 11 + index;
        temp[pieces[index].coordinates[0][1].y + 1][pieces[index].coordinates[0][1].x + 5] = 11 + index;
        temp[pieces[index].coordinates[0][2].y + 1][pieces[index].coordinates[0][2].x + 5] = 11 + index;
        temp[pieces[index].coordinates[0][3].y + 1][pieces[index].coordinates[0][3].x + 5] = 11 + index;
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

    function rotate() {
        let temp = empty_board()
        let update = true;
        for (let j = 9; j >= 0; j--) {
            for (let i = 19; i >= 0; i--) {
                if (grid[i][j] < 10) {
                    temp[i][j] = grid[i][j];
                }
            }
        }
        const r = (rotation + 1)%4;
        for (let i = 0; i < 4; i++) {
            const x = pieces[index].coordinates[r][i].x + globalX;
            const y = pieces[index].coordinates[r][i].y + globalY;
            console.log(x)
            console.log(y)
            console.log(temp)
            if (checkSpace(x, y, temp)) {
                temp[y][x] = index + 11;
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


    setTimeout(drop, 1500);

</script>


<div class="flex bg-background w-screen h-full overflow-y-clip m-0 items-center justify-center">
    <Board grid={grid}></Board>
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />


