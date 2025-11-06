const asyncWrapper = require("../Middleware/asyncWrapper");
const OrderModel = require('../Models/ordersmodel');
const customError = require("../utils/customError");

const CreateOrders = asyncWrapper(async (req, res, next) => {
  const user = req.body?.user;
  const items = req.body?.items;
  const shipping_address = req.body.shipping_address;

  const grouped = items.reduce((acc, current) => {
    if (!acc[current?.shop_id]) acc[current?.shop_id] = [];
    acc[current?.shop_id].push(current);
    return acc;
  }, {});

  for (const key in grouped) {
    const vendorProducts = grouped[key];
    const total_price = vendorProducts.reduce((acc, current) => {
      const originalPrice = current?.original_price;
      const discountedPrice = current?.discounted_price;
      const couponedPrice = current?.couponedPrice;
      const finalPrice = couponedPrice
        ? couponedPrice
        : discountedPrice
        ? discountedPrice
        : originalPrice;
      return ((acc + finalPrice) * current?.qty);
    }, 0);

    // const refinedProductsData = vendorProducts.map((item, i) => {
    //   const name = item?.product_name;
    //   const qty = item?.qty;
    //   const price = item?.couponedPrice
    //     ? item?.couponedPrice
    //     : item?.discounted_price
    //     ? item?.discounted_price
    //     : item?.original_price;
    //   return {
    //     product_name: name,
    //     qty: qty,
    //     listed_price:  item?.discounted_price
    //     ? item?.discounted_price
    //     : item?.original_price,
    //     charged_price:price
    //   };
    // });

    const Order = await OrderModel.create({
        shop_id: key,
        customer_detail:user,
        products:vendorProducts,
        total_price:total_price,
        order_status:'Pending',
        payment_status:'Paid',
        shipping_address:shipping_address,
        customer_id:user?._id

    })


  }

  res.status(200).json({
    success:true,
    message:'Orders created successfully'
  })
});


const GetVendorOrders = asyncWrapper(async(req,res,next)=>{
    const shopId = req.params.id
    const orders = await OrderModel.find({
        shop_id:shopId
    })
    return res.status(200).json({
        success:true,
        message:'Orders fetched successfully',
        data:orders
    })
    
})
const GetCustomerOrders = asyncWrapper(async(req,res,next)=>{
    const customerId = req.params.id
    const orders = await OrderModel.find({
        customer_id:customerId
    })
    return res.status(200).json({
        success:true,
        message:'Orders fetched successfully',
        data:orders
    })
    
})

const GetOrderDetails = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    const orderDetail = await OrderModel.findOne({_id:id})
    if(!orderDetail){
        return next(customError(400,'Order does not exist against this id'))
    }
    res.status(200).json({
        success:true,
        message:'Order details fetched successfully',
        data:orderDetail
    })
})


const updateOrderStatus = asyncWrapper(async(req,res,next)=>{
    const id = req.params?.id
    const orderStatus = req.body?.order_status
    const updatedOrderDetails = await OrderModel.findOneAndUpdate({_id:id},{order_status:orderStatus},{
        new:true,
        runValidator:true
    })
    return res.status(201).json({
        success:true,
        data:updatedOrderDetails
    })
})

module.exports = {
  CreateOrders,
  GetVendorOrders,
  GetCustomerOrders,
  GetOrderDetails,
  updateOrderStatus
};
