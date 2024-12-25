import csv
import json

# Input and output file paths
input_file = "filtered_quotes.csv"
output_file = "quotes.json"

# Read the CSV and convert to JSON
quotes = []
with open(input_file, "r", encoding="utf-8") as infile:
    reader = csv.DictReader(infile)
    for row in reader:
        quotes.append({
            "quote": row["quote"],
            "author": row["author"],
            "category": row["category"]
        })

# Write the JSON to a file
with open(output_file, "w", encoding="utf-8") as outfile:
    json.dump(quotes, outfile, ensure_ascii=False, indent=4)

print(f"Quotes have been converted to JSON and saved to '{output_file}'.")