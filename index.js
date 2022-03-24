require("dotenv").config();
const express = require("express");
const { create } = require("express-handlebars");
const { getTodos } = require("./database");

const app = express();

app.use(express.static(__dirname + "/public"));

const hbs = create({
    partialsDir: ["views/partials"],
    extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", async (req, res) => {
    const { data } = await getTodos();
    res.render("home", { data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("✔✔✔"));
