import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

// Open the KV database
const kv = await Deno.openKv(
  "https://api.deno.com/databases/84b4bf31-98e8-45b8-9c18-7bdecf25987f/connect",
);

// Function to calculate the day of the year (0-365)
function getDayOfYear() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear; // Milliseconds difference
  const oneDay = 1000 * 60 * 60 * 24;  // One day in milliseconds
  return Math.floor(diff / oneDay);  // Return day of the year (0 to 365)
}

// Function to get today's quote based on the day of the year
async function getTodaysQuote() {
  const dayOfYear = getDayOfYear();
  console.log(`Fetching quote for day ${dayOfYear}...`); // Debugging log

  const todaysQuote = await kv.get([dayOfYear]);
  console.log(todaysQuote);

  if (!todaysQuote) {
    console.error(`No quote found for day ${dayOfYear}.`); // Debugging log
    throw new Error(`Quote for day ${dayOfYear} not found in KV. Please upload quotes first.`);
  }

  // Ensure the value returned has the expected structure
  if (!todaysQuote || !todaysQuote.value.quote || !todaysQuote.value.author) {
    console.error(`No valid quote found for day ${dayOfYear}.`);
    throw new Error(`Quote for day ${dayOfYear} not found in KV. Please upload quotes first.`);
  }

  return todaysQuote;
}

// Start the server
console.log("Server is running on http://localhost:8000");

serve(async (req) => {
  try {
    const todaysQuote = await getTodaysQuote();
    const response = {
      quote: todaysQuote.value.quote,
      author: todaysQuote.value.author,
    };

    console.log("Sending response:", response); // Log the response for debugging
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific HTTP methods
        "Access-Control-Allow-Headers": "Content-Type", // Allow specific headers
      },
    });
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});


