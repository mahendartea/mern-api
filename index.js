const express = require('express');
const app = express();
const port = 4000;

app.get('/',(req,res)=>{
   res.send('Hello world hai hai bro bro keren besok kita kerja lagi')
});

app.listen(port, ()=> {
   console.log(`Example app listening at http://localhost:${port}`);
});

