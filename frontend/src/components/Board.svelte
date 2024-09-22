<script lang="ts">
    import "../app.css"
    import { onMount } from 'svelte'

    export let grid: number[][];

    let context: CanvasRenderingContext2D | null;
    let canvas: HTMLCanvasElement;
    let width: number;
    let height: number;

    onMount(() => {
        context = canvas.getContext('2d')
        console.log(context);

        width = canvas.width
        height = canvas.height

        if (context) {drawPieces(grid)}
    });

    function drawGrid() {
        if (context) {
            context.lineWidth = 2;
            context.beginPath();
            for (let i = 100; i < 1000; i += 100) {
                context.moveTo(i, 0)
                context.lineTo(i, 2000)
            }
            for (let i = 100; i < 2000; i += 100) {
                context.moveTo(0, i)
                context.lineTo(1000, i)
            }
            context.stroke()
        }
    }

    function drawPieces(grid: number[][]){
        console.log(grid)
        context?.clearRect(0, 0, 1000, 2000);
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if (context) {
                    let color: number = grid[i][j]
                    if (color > 10) {
                        color -= 10;
                    }
                    if (color === 1) {
                        context.fillStyle = "#dddd00";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    } else if (color === 2) {
                        context.fillStyle = "#9a00cd";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    } else if(color === 3) {
                        context.fillStyle = "#00cdcd";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    } else if(color === 4) {
                        context.fillStyle = "#cd0000";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    } else if(color === 5) {
                        context.fillStyle = "#00cd00";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    } else if(color === 6) {
                        context.fillStyle = "#cd6600";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    } else if(color === 7) {
                        context.fillStyle = "#0000cd";
                        context.fillRect(100 * j, 100 * i, 100, 100)
                    }
                }
            }
        }
        drawGrid()
    }

    $:drawPieces(grid)

</script>


<canvas height="2000" width="1000" bind:this={canvas} class="h-[85vh] aspect-[1/2] bg-white outline-black outline-1 outline">

</canvas>



