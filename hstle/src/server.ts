import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

// Load the quotes.json file
const quotes = JSON.parse(await Deno.readTextFile("/Users/maxmercurio/Documents/GitHub/H-TLE/hstle/src/quotes.json"));

// Function to get today's quote
function getTodaysQuote() {
  const today = new Date();
  const index = today.getDate() % quotes.length;
  return quotes[index];
}

// Start the server
console.log("Server is running on http://localhost:8000");

serve((req) => {
  const todaysQuote = getTodaysQuote();
  const response = {
    quote: todaysQuote.quote,
    author: todaysQuote.author,
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific HTTP methods
      "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
    },
  });
});