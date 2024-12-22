import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log("Received userId:", req.body.userId);
      return res.json({ success: false, message: "Invalid user ID format" });
      
    }

    // Find user by ID
    const userData = await userModel.findOne({ _id: userId });

    // Handle case where user is not found
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Ensure cartData is initialized
    let cartData = userData.cartData || {};

    // Check if the item is already in the cart
    const itemId = req.body.itemId;
    if (!cartData[itemId]) {
      cartData[itemId] = 1; // Add item with quantity 1
    } else {
      cartData[itemId] += 1; // Increment quantity
    }

    // Update user's cart data in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Error in addToCart:", error.message);
    res.json({ success: false, message: "An error occurred while adding to cart" });
  }
};


const removeFromCart= async(req,res)=>{
    try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
      } 
      await userModel.findByIdAndUpdate(req.body.userId ,{cartData});
      res.json({success:true, message:"Remove from cart"})
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "An error occurred while removing from cart" });
    
    }
}

const getCart = async (req,res) =>{
  try{ 
  let userData = await userModel.findById(req.body.userId);
  let cartData = await userData.cartData;
  res.json({success:true, cartData})
}
catch(error){
 console.log(error);
 res.json({success:false, message:"Error"})
}
}

export {addToCart, removeFromCart, getCart}