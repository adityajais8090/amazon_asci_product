require("dotenv").config();

async function listModels() {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models",
    {
      method: "GET",
      headers: { "x-goog-api-key": process.env.GEMINI_API_KEY }
    }
  );

  const data = await response.json();
  console.log("\n======= Available Models =======\n");
  data.models.forEach((m) => console.log(m.name));
}

listModels();
