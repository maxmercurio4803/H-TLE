import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { join } from "https://deno.land/std@0.178.0/path/mod.ts";
import { extname } from "https://deno.land/std@0.178.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.178.0/fs/mod.ts";

// Open the KV database
const kv = await Deno.openKv();

// Path to your frontend's dist folder
const distFolder = "./dist";

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

// Function to serve static files (HTML, CSS, JS)
async function serveStaticFile(path: string) {
  const filePath = join(distFolder, path);
  console.log(`Serving static file: ${filePath}`);

  try {
    const file = await Deno.readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    const contentType = ext === '.html'
      ? "text/html"
      : ext === '.css'
        ? "text/css"
        : ext === '.js'
          ? "application/javascript"
          : "application/octet-stream";

    return new Response(file, {
      status: 200,
      headers: { "Content-Type": contentType }
    });
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
}

serve(async (req) => {
  const url = new URL(req.url);
  
  // Serve static files from the dist folder (like index.html)
  if (url.pathname.startsWith("/dist/") || url.pathname === "/") {
    
    return serveStaticFile(url.pathname === "/" ? "/index.html" : url.pathname);
  }

  // Handle API request for the quote
  if (url.pathname === "/api/quote") {
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
          "Cache-Control": "no-store",
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
  }

  // Return 404 if the route doesn't match
  return new Response("Not Found", { status: 404 });
});


