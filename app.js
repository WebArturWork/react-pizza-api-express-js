var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cors = require("cors");
const authMiddleware = require("./middleware/auth");

var app = express(); // Инициализируем app здесь

// Подключаем CORS для всех маршрутов
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Подключаем стандартные middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Используем authMiddleware для всех маршрутов
// app.use(authMiddleware);

// Подключаем маршруты
// app.use("/", authMiddleware, indexRouter);
// app.use("/users", authMiddleware, usersRouter);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Обработка 404 и передача ошибки обработчику
app.use(function (req, res, next) {
  next(createError(404));
});

// Обработчик ошибок
app.use(function (err, req, res, next) {
  // Устанавливаем локальные переменные, предоставляя ошибку только в разработке
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Рендерим страницу ошибки
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
