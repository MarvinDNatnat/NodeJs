const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authentication = require("./api/routes/authentication");
const accountRoutes = require("./api/routes/accounts");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const auth = require("./api/middleware/auth");

dotenv.config();

//for cookies
app.use(cookieParser());

//logs
app.use(morgan("dev"));

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test Api Project",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:" + process.env.PORT + "/",
      },
    ],
  },
  apis: ["./api/routes/**.js"],
};
const SwaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

//Accept json body params
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//All Request api for authentication entry point
app.use("/authenticate", authentication);

//Live Chat Entry Point // this is page
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//All Request api for account entry point
app.use("/account", auth, accountRoutes);

//Cron jobs
var cron = require("node-cron");
cron.schedule(
  "59 38 16 * * *",
  () => {
    console.log("Running a job at 4:38:59 PM at Asia/Singapore timezone");
  },
  {
    scheduled: true,
    timezone: "Asia/Singapore",
  }
);

//Error Handling for error 404
app.use((req, res, next) => {
  const error = new Error("It Look likes you are looking for nothing!");
  error.status = 404;
  next(error);
});

//Error Handling for anything
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
