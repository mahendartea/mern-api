const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
// 
const productRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');

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
app.use((req,res,next)=>{
   // semua link, Aksess Cros Origin Policy
   res.setHeader('Akses-Control-Allow-Origin','*');
   // spesifik
   res.setHeader('Akses-Control-Allow-Origin','https://codepen.io');
   
   // method akses diberikan
   res.setHeader('Akses-Control-Allow-Method','POST,GET,PUT,DELETE,PATCH,OPTION');
   
   // Jenis Header
   res.setHeader('Akses-Control-Allow-Headers','Content-Type, Authorization');
   next();
});


// akses product Endpoint API
app.use('/v1/costumer', productRoutes);
app.use('/v1/auth',authRoutes);
// app.use('/v1/auth',authRoutes);

app.listen(port, ()=> {
   console.log(`Example app listening at http://localhost:${port}`);
});

