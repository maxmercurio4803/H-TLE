import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

const handler = (req: Request): Response => {
  return new Response("Hello, Deno Deploy!", {
    headers: { "content-type": "text/plain" },
  });
};

console.log("Listening on http://localhost:8000");
serve(handler);