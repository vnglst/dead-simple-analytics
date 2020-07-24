<script>
  import { getVisits, toDateInputValue } from "./helpers";
  export let url = window.location.origin;
  export let date = toDateInputValue(new Date());
  let promise;

  $: {
    promise = getVisits(url, date);
  }
</script>

<input type="text" bind:value={url} />
<input type="date" bind:value={date} />
<span>
  {#await promise}
    ...waiting
  {:then visits}
    {visits ? `${visits} visits` : 'no data'}
  {:catch error}
    {error.message}
  {/await}
</span>
