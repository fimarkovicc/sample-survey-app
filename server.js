const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());

app.use("/api/v1/survey", require("./routes/api/v1/survey"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT)
