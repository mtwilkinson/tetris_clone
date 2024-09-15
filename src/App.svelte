<script lang="ts">
  import "./app.css"
  import { Router, Route } from "svelte-routing"
  import homepage from "./pages/homepage.svelte";
  import test from "./pages/Play.svelte";
  import Navbar from "./components/Navbar.svelte";
</script>


<div class="flex bg-background w-screen h-screen m-0 items-center justify-center flex-col">
    <Navbar/>
    <div class="flex bg-background w-screen h-screen p-8 m-0 items-center justify-center">
        <Router>
            <Route path="/" component={homepage} />
            <Route path="/play" component={test} />
        </Router>
    </div>
</div>



