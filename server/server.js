require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//using middleware
app.use(cors());
app.use(express.json());

//mongodb connections
const con = require("./db/connect");

//using routes
app.use(require("./routes/route"));

con
  .then((db) => {
    if (!db) return process.exit(1);
    //listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port:http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`failed to connect with http server:${err}`)
    );
    //error in mongodb connections
  })
  .catch((error) => {
    console.log(`connectionfailed..!${error}`);
  });
