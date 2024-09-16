<script lang="ts">
    import "../app.css"
    import Board from "../components/Board.svelte";

    let grid: number[][] = [
        [1,2,3,4,5,6,7,11,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,11,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]

    grid[2][1] = 10;

    function  onKeyDown(e: KeyboardEvent) {
        console.log(e)

    }

    setTimeout(test, 1000)
    function test() {
        grid[12][6] = 1
        grid[5][0] = 1
        grid[17][8] = 1
        grid[2][3] = 1
    }


</script>


<div class="flex bg-background w-screen h-full overflow-y-clip m-0 items-center justify-center">
    <Board grid={grid}></Board>
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />


