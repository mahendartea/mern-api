const express = require('express');
const app = express();
const port = 4000;

const productRoutes = require('./src/routes/products');

// akses Home
app.use('/', (req,res,next)=>{
   res.send("hai")
});

// akses product
app.use('/v1/costumer', productRoutes);

//untuk di akses oleh link lain
app.use((req,res,next)=>{
   // semua link, Aksess Cros Origin Policy
   res.setHeader('Akses-Control-Allow-Origin','*');
   // spesifik
   // res.setHeader('Akses-Control-Allow-Origin','https://codepen.io');
   
   // method akses diberikan
   res.setHeader('Akses-Control-Allow-Method','POST,GET,PUT,DELETE,PATCH,OPTION');
   
   // Jenis Header
   res.setHeader('Akses-Control-Allow-Headers','Content-Type, Authorization');
   next();
})

app.listen(port, ()=> {
   console.log(`Example app listening at http://localhost:${port}`);
});

