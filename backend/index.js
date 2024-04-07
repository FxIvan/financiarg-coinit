const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 204,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const userModel = require("./models/userModel");

const path = require("path");

const app = express();
const server = require("http").Server(app);

//ver de donde viene la request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

//Inhabilite la cabecera X-Powered-By. Los atacantes pueden utilizar esta cabecera (que está habilitada de forma predeterminada) para detectar las aplicaciones que ejecutan Express e iniciar ataques con destinos específicos
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* set file limit */
app.use(express.json({ limit: "100mb" }));
app.use(cors(corsOptions));
dotenv.config();

connectDB(
  "mongodb+srv://" +
    //process.env.MONGO_USER +
    "almendra" +
    ":" +
    encodeURIComponent("SV3efZHOVD3XAr5P") + //process.env.MONGO_PSW
    "@" +
    process.env.MONGO_URI
);

/* Declare Environment Variables */
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Api running....");
});
console.log("Serving Express App...");

app.use(function (req, res, next) {
  req.endpoint = req.originalUrl.split("/")[2];
  req.method = req.method;
  switch (req.endpoint) {
    case "users":
      req.Model = userModel;
      break;
  }

  next();
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

server.listen(PORT, () => console.log("Server started on port " + PORT));
