<script lang="ts">
  import Quote from './lib/Quote.svelte'
</script>

<main>
  
  <img src="/hstle_logo.PNG" alt="hstle logo" />
  <div class="card">
    <Quote/>
  </div>
  
  <p>
    Check out the <a href="https://bit.ly/3Wj8Zzi" target="_blank" rel="noreferrer">HSTLE store</a>.
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