<script>
    import { onMount } from "svelte";
  
    let quote = "";
    let author = "";
  
    onMount(async () => {
      const response = await fetch("http://localhost:8000");
      const data = await response.json();
      quote = data.quote;
      author = data.author;
    });
</script>
  
<style>
    .quote-container {
      text-align: center;
      margin: 20px;
      font-family: Arial, sans-serif;
    }
    .quote {
      font-size: 1.5em;
      font-style: italic;
      margin-bottom: 10px;
    }
    .author {
      font-size: 1.2em;
      font-weight: bold;
    }
</style>
  
<div class="quote-container">
    <div class="quote">"{quote}"</div>
    <div class="author">- {author}</div>
</div>