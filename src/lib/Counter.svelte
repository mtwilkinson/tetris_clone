<script lang="ts">
  import "../app.css"
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment} class="bg-blue-950 h-8 w-28 text-white hover:bg-blue-200 hover:text-black">
  count is {count}
</button>
