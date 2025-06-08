const createResturantController = async (req,res) => {
    try {
  
    
    }catch (error)  {
        res.status(500).json({
          status: false,
          message: "Error In Create Restrauant API",
          error,
        });
        console.log(error.message);
      }

}

module.exports  =  createResturantController