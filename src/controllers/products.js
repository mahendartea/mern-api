exports.createProduct = (req,res,next) => {
   const name = req.body.name
   const price = req.body.price
   const diskon = req.body.diskon
   res.json(
      {
         message: 'Create Product Success!!!',
         data: {
            id : 1,
            name : name,
            price : price,
            diskon : diskon
         },
      }
   );
   next();
};

exports.getAllProducts = (req,res,next) => {
   res.json(
      {
         message: 'Get All Products success!',
         data:[
            {
               id:1,
               name: 'Sari Gandum',
               price: 5000
            }
         ]
      }
   );
   next();
}





