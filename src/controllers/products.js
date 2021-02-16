exports.createProduct = (req,res,netxt) => {
   res.json(
      {
         message: 'Create Product Success!!!',
         data: {
            id:1,
            name: 'Sari Nutri',
            price: 5000
         }
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





