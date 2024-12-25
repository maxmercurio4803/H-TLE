<script>
    import { onMount } from "svelte";
  
    let quote = "";
    let author = "";
    let error = "";

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:8000");

            if (!response.ok) {
                throw new Error("Failed to fetch quote");
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Log the fetched data for debugging
            quote = data.quote;
            author = data.author;
        } catch (err) {
            console.error("Error fetching quote:", err);
            error = "Failed to load quote."; // Display error if the fetch fails
        }
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
    .error {
        color: red;
        font-size: 1.2em;
    }
</style>
  
<div class="quote-container">
    {#if error}
        <div class="error">{error}</div>
    {:else}
        <div class="quote">"{quote}"</div>
        <div class="author">- {author}</div>
    {/if}
</div>
