const asyncWrapper = require("../Middleware/asyncWrapper");
const customError = require("../utils/customError");

//  console.log('keys are',process.env.STRIPE_SECRET_KEYS)

const StripeCheckoutSession = asyncWrapper(async (req, res, next) => {
  const items =
    req.body?.length > 0 &&
    req.body?.map((item) => {
      const images = item?.images?.map(
        (item, i) => `${process.env.API_URL}/uploads/${item}`
      );
      console.log("images", images);
      return {
        price_data: {
          currency: "usd", // or pkr if using FX through stripe-supported PSP (PK not supported directly)
          product_data: {
            name: item.product_name,
            description: item.description,
            images: req.body?.images?.map(
              (item, i) => `${process.env.API_URL}/uploads/${item}`
            ),
            metadata: {
              productId: item._id,
              vendorId: item.shop_id,
              price: item?.couponedPrice
                ? item?.couponedPrice
                : item?.discounted_price
                ? item?.discounted_price
                : item?.original_price,
            },
          },
          unit_amount:
            (item?.couponedPrice
              ? item?.couponedPrice
              : item?.discounted_price
              ? item?.discounted_price
              : item?.original_price) * 100, // amount in cents
        },
        quantity: item?.qty,
      };
    });
    const shippingCost = req.body?.reduce((acc,current)=>acc + ((current?.discounted_price ? current?.discounted_price : current?.original_price) * current?.qty),0)
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEYS);
 
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: [...items,{
        price_data:{
            currency:'usd',
            product_data:{
                name:'Shipping Cost'
            },
            unit_amount: shippingCost * 100 * 0.1,
        },
        quantity : 1
    }],
    mode: "payment",
    success_url: `${process.env.FE_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FE_URL}/checkout?cancel=true`,
  });
  return res.status(200).json({ success: true, data: checkoutSession?.url });
});

const SessionVerification = asyncWrapper(async(req,res,next)=>{
    const data = req.body?.orderDetails
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEYS);
    const id = req.body?.id
    const response = await stripe.checkout.sessions.retrieve(id)
    if(response?.payment_status !== 'paid'){
        return next(customError(400,'Payment Verification Failed'))
    }
    res.status(200).json({
      success:true,
      message:'Payment Verified successfull'
    })
})

module.exports = {
  StripeCheckoutSession,
  SessionVerification
};
