<script lang="ts">
    import "../app.css"
    export let name;
    export let url;
</script>

<a href={url}>
    <button class="bg-primary w-32 h-10 text-white hover:bg-primaryLight hover:text-black font-bold">
        {name}
    </button>
</a>



