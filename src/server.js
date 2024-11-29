const express = require("express");
const fetchData = require("./dataFetcher"); // Assuming this module fetches data
const evaluateChecklist = require("./checklistEvaluator"); // Assuming this module evaluates the checklist
const rules = require("./rules.json"); // Assuming this contains the rules for the checklist evaluation

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files (optional, if you want to serve CSS/JS assets in your views)
app.use(express.static("public"));

// Define a route for the homepage (render an EJS view)
app.get("/", (req, res) => {
  res.render("index", {
    message: "Hello, welcome to the Transition Computing API!",
  });
});

// Define the POST route for the checklist that fetches data and evaluates it
app.post("/checklist", async (req, res) => {
  try {
    // Fetch data from the external API
    const data = await fetchData("https://api.example.com/data");

    if (data) {
      // Evaluate the checklist based on the fetched data and the rules
      const result = evaluateChecklist(data, rules);

      // Respond with the evaluation result as JSON
      res.json(result);
    } else {
      res.status(500).send("Failed to fetch data");
    }
  } catch (error) {
    res.status(500).send("Error fetching data: " + error.message);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
