import csv

# List of desired categories
desired_categories = [
    "work", "logic", "truth", "requirements", "inspiration", "respect", "inspirational",
    "faith", "strength", "knowledge", "wisdom", "courage", "individuality",
    "understanding", "doing", "learning", "action", "virtue", "choice", "self-discovery"
]

undesired_authors = [
    "Marilyn Monroe", "Lady Gaga", "Taylor Swift", "Trevor Noah", "Barbara Walters", "Trisha Yearwood"
]

undesired_categories = [
    "love", "feminism", "femininism"
]


# Input and output CSV file paths
input_file = "quotes.csv"
output_file = "filtered_quotes.csv"

# Open the input CSV and filter rows based on categories
with open(input_file, "r", newline="", encoding="utf-8") as infile, open(output_file, "w", newline="", encoding="utf-8") as outfile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)

    # Write the header row to the output file
    writer.writeheader()

    # Filter and write rows that match the desired categories
    for row in reader:
        categories = [cat.strip() for cat in row["category"].split(",")]
        authors = [cat.strip() for cat in row["author"].split(",")]
        if any(category in desired_categories for category in categories) and not any(author in undesired_authors for author in authors) and not any(category in undesired_categories for category in categories):
            writer.writerow(row)

print(f"Filtered quotes have been saved to '{output_file}'.")