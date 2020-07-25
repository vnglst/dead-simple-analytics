<script>
  import { getVisits, toDateInputValue } from "./helpers";
  import Analytics from "./Analytics.svelte";

  const SITES = [
    { url: window.location.origin, date: toDateInputValue(new Date()) },
    { url: "https://finding-nora.com", date: toDateInputValue(new Date()) },
    { url: "https://tafels.app", date: toDateInputValue(new Date()) },
  ];
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  div {
    padding: 0.5em;
  }
</style>

<main>
  <h1>simple analytics</h1>
  <p>Demonstration of tracking page views using begin.app</p>

  {#each SITES as site}
    <div>
      <Analytics url={site.url} date={site.date} />
    </div>
  {/each}
</main>
