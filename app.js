import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/name/india?fullText=true");
    const result = response.data;
    // console.log(result);
    res.render("index.ejs",{data:result});
  } catch (error) {
    res.render("failure.ejs");
  }
  
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const country = req.body.country;
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    const result = response.data;
    // console.log(result);
    res.render("index.ejs",{data:result});

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("failure.ejs");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${port}`);
});
