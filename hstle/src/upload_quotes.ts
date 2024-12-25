// Open the KV database
const kv = await Deno.openKv(
    "https://api.deno.com/databases/84b4bf31-98e8-45b8-9c18-7bdecf25987f/connect",
);

// Load the quotes from the JSON file
const quotesJson = await Deno.readTextFile("/Users/maxmercurio/Documents/GitHub/H-TLE/hstle/src/quotes.json");
const quotes = JSON.parse(quotesJson);

// Function to upload quotes to KV (one by one, including the author)
async function uploadQuotes() {
    // Iterate through the quotes and upload each one with an increasing number as the key
    for (let i = 0; i < quotes.length; i++) {
        const { quote, author } = quotes[i]; // Destructure quote and author
        const quoteWithAuthor = { quote, author }; // Store both quote and author in an object

        // Use the index (i + 1) as the key, so keys will be 1, 2, 3, etc.
        await kv.set([i], quoteWithAuthor);
        console.log(`Quote ${i + 1} by ${author} has been uploaded to KV.`);
    }
}

// Run the upload function
await uploadQuotes();



