const express = require("express");
const app = express();

// body parser untuk mengelola form input
const bodyParser = require("body-parser");

// mongoose untuk koneksi ke mongodb
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

const port = 4000;
// akses Home
// app.use('/', (req,res,next)=>{
//    res.send(`
//    <a href="http://localhost:4000/v1/costumer/products">Get Products</a>
//    `)
// });

// body parser
app.use(bodyParser.json()); //type json.
app.use(bodyParser.urlencoded({ extended: false }));

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
    // "mongodb+srv://mahendar:haguselatan@mern-project-latihan.l3ynb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    "mongodb+srv://mahendar:haguselatan@mern-project-latihan.l3ynb.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Connection Success, This app listening at http://localhost:${port}`
      );
    });
  })
  .catch((err) => console.log(err));
