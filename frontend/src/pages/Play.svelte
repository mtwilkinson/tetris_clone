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

    }


    setTimeout(drop, 1500)

    console.log('test');

    function drop() {
        let temp = empty_board()
        try {
            for (let i = 19; i >= 0; i--) {
                for (let j = 0; j < 10; j++) {

                    if (grid[i][j] > 10) {
                        temp[i + 1][j] = grid[i][j];
                        temp[i][j] = 0;
                    } else {
                        temp[i][j] = grid[i][j];
                    }
                }
            }
        }
        catch (e) {
            temp = empty_board()
            temp[0][4] = 11;
            temp[0][5] = 11;
            temp[1][4] = 11;
            temp[1][5] = 11;
        }
        grid = temp;
        setTimeout(drop, 1000)
    }

    function copy_board(new_board: number[][]) {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                grid[i][j] = new_board[i][j]
            }
        }
    }


</script>


<div class="flex bg-background w-screen h-full overflow-y-clip m-0 items-center justify-center">
    <Board grid={grid}></Board>
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />


