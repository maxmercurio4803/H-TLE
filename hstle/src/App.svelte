<script lang="ts">
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <img src="/hstle_logo.PNG" alt="hstle logo" />
  <h2>The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.</h2>
  <h3> - Winston Churchill</h3>

  <!-- <div class="card">
    <Counter />
  </div> -->
  <h1></h1>
  <p>
    Check out the <a href="https://hstle.store" target="_blank" rel="noreferrer">HSTLE store</a>.
  </p>
</main>


<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  
  img {
    height: 100px;
    width: 100px;
  }

</style>