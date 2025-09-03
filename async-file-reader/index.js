const fs = require("fs/promises");

async function readFiles() {
  try {
    // Read all three files in parallel
    const [a, b, c] = await Promise.all([
      fs.readFile("a.txt", "utf-8"),
      fs.readFile("b.txt", "utf-8"),
      fs.readFile("c.txt", "utf-8"),
    ]);

    // Print contents
    console.log("Contents of a.txt:\n", a, "\n");
    console.log("Contents of b.txt:\n", b, "\n");
    console.log("Contents of c.txt:\n", c, "\n");

    // Calculate total characters
    const totalChars = a.length + b.length + c.length;
    console.log("Total number of characters:", totalChars);

  } catch (err) {
    console.error("Error reading files:", err);
  }
}

readFiles();
