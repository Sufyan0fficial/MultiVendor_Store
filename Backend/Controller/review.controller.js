const ReviewModel = require('../Models/review.model');
const asyncWrapper = require('../Middleware/asyncWrapper');
const CustomError = require('../utils/customError');
const ProductModel = require('../Models/Product.model')

const createReview = asyncWrapper(async (req, res, next) => {
    const { customer_id, product_id, order_id, rating, comment, customer_name, customer_avatar } = req.body;
    
    // Check if review already exists for this product and order
    const existingReview = await ReviewModel.findOne({ 
        customer_id, 
        product_id, 
        order_id 
    });
    
    if (existingReview) {
        return next(CustomError(400,'Review already exists for this product')) 
    }
    
    // Handle uploaded images
    const images = req.files?.length > 0 ? req.files.map(file => file.filename) : [];
    
    const review = await ReviewModel.create({
        customer_id,
        product_id,
        order_id,
        rating,
        comment,
        images,
        customer_name,
        customer_avatar
    });

    const products = await ReviewModel.find({product_id:product_id})

    const totalRating =  Math.round(products?.reduce((acc,current)=>acc + current?.rating,0) / products?.length)
    const response = await ProductModel.findOneAndUpdate({_id:product_id},{$set: {rating:totalRating}},{new:true})
    console.log('udpate porduct rating ,',response,'total rating',totalRating,'products are',products)

    
    
    res.status(201).json({
        success: true,
        message: 'Review created successfully',
        data: review
    });
});

const getProductReviews = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    
    const reviews = await ReviewModel.find({ product_id: productId })
        .sort({ createdAt: -1 });
    
    res.status(200).json({
        success: true,
        data: reviews
    });
});

const getShopReviews = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    
    // First, find all products belonging to this shop
    const shopProducts = await ProductModel.find({ shop_id: id });
    const productIds = shopProducts.map(product => product._id.toString());
    
    // Then find all reviews for these products
    const reviews = await ReviewModel.find({ 
        product_id: { $in: productIds }
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
        success: true,
        data: reviews
    });
});

const getCustomerReviews = asyncWrapper(async (req, res) => {
    const { customerId } = req.params;
    
    const reviews = await ReviewModel.find({ customer_id: customerId })
        .sort({ createdAt: -1 });
    
    res.status(200).json({
        success: true,
        data: reviews
    });
});

module.exports = {
    createReview,
    getProductReviews,
    getCustomerReviews,
    getShopReviews
};
