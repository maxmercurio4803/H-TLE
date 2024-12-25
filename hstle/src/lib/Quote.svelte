<script>
    import { onMount } from 'svelte';
  
    let quote = '';
    let author = '';
    let quotes = [];
  
    // Function to fetch and load the quotes from the JSON file
    async function loadQuotes() {
      const response = await fetch('/quotes.json'); // Ensure this points to your JSON file
      quotes = await response.json();
      pickRandomQuote();
    }
  
    // Function to pick a random quote
    function pickRandomQuote() {
      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quote = quotes[randomIndex].quote;
        author = quotes[randomIndex].author;
        console.log(author)
      }
    }
  
    // Set a timer to update the quote at midnight EST
    function scheduleMidnightUpdate() {
      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000;
      const estOffset = -5 * 60 * 60 * 1000; // EST is UTC-5
      const estNow = new Date(now.getTime() + utcOffset + estOffset);
  
      const midnight = new Date(estNow);
      midnight.setHours(24, 0, 0, 0); // Set to next midnight EST
  
      const timeUntilMidnight = midnight.getTime() - estNow.getTime();
      setTimeout(() => {
        pickRandomQuote();
        scheduleMidnightUpdate(); // Reschedule for the next midnight
      }, timeUntilMidnight);
    }
  
    onMount(() => {
      loadQuotes();
      scheduleMidnightUpdate();
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