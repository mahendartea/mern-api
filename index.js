const express = require("express");

// body parser untuk mengelola form input
const bodyParser = require("body-parser");
// mongoose untuk koneksi ke mongodb
const mongoose = require("mongoose");
// paket multer untuk form-data/file
const multer = require("multer");

const app = express();

const path = require("path");
// require file route
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

const port = 4000;

// membuat tempat simpan image dengan multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// Filter jenis image
const filterImage = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer
app.use(
  multer({ storage: fileStorage, fileFilter: filterImage }).single("image")
);

// akses image folder
app.use("/images", express.static(path.join(__dirname, "images")));

// body parser
app.use(bodyParser.json()); //type json.
app.use(bodyParser.urlencoded({ extended: false }));

// =================================================

//untuk di akses oleh link lain
app.use((req, res, next) => {
  // semua link, Aksess Cros Origin Policy
  res.setHeader("Akses-Control-Allow-Origin", "*");
  // spesifik
  res.setHeader("Akses-Control-Allow-Origin", "https://codepen.io");

  // method akses diberikan
  res.setHeader(
    "Akses-Control-Allow-Method",
    "POST,GET,PUT,DELETE,PATCH,OPTION"
  );

  // Jenis Header
  res.setHeader("Akses-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// akses product Endpoint API
// app.use('/v1/costumer', productRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

// validation error
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

// koneksi ke mongodb
mongoose
  .connect(
    // "mongodb+srv://mahendar:haguselatan@mern-project-latihan.l3ynb.mongodb.net/blog?retryWrites=true&w=majority"
    "mongodb+srv://mahendar:haguselatan@mern-project-latihan.l3ynb.mongodb.net/blog?retryWrites=true&w=majority&ssl=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Connection Success, This app listening at http://localhost:${port}`
      );
    });
  })
  .catch((err) => console.log(err));
