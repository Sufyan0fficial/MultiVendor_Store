const asyncWrapper = require("../Middleware/asyncWrapper");
const ProductModel = require("../Models/Product.model");
const customError = require("../utils/customError");
const SellerModel = require("../Models/seller.model");

const CreateProduct = asyncWrapper(async (req, res, next) => {
  const files = req.files;
  console.log("files are", files);
  const images = files?.map((item) => item?.filename);
  const data = req.body;
  const ShopData = await SellerModel.findById(data?.shop_id);
  if (!ShopData) {
    return next(customError(400, "Shop does not exist"));
  }
  const ProductData = data;
  ProductData.images = images;
  ProductData.shop = ShopData;

  const response = await ProductModel.create(ProductData);
  return res
    .status(201)
    .json({
      success: true,
      message: "Product created successfully",
      data: response?._doc,
    });
});

const GetProducts = asyncWrapper(async (req, res, next) => {
  const id = req.params?.id;
  const ShopData = await SellerModel.findById(id);
  if (!ShopData) {
    return next(customError(400, "Shop does not exist"));
  }
  const products = await ProductModel.find({ shop_id: id });
  return res.status(200).json({ success: true, data: products });
});

const DeleteProduct = asyncWrapper(async (req, res, next) => {
  const id = req.params?.id;
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(customError(404, "Requested Event for delete does not exist"));
  }
  const shopId = product?.shop_id;
  await ProductModel.findOneAndDelete({ _id: id });
  const allProducts = await ProductModel.find({ shop_id: shopId });
  console.log("all products are", allProducts);
  return res
    .status(200)
    .json({
      success: true,
      message: "Event Deleted Successfully",
      data: allProducts,
    });
});

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const products = await ProductModel.find({});
  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
});

const getProduct = asyncWrapper(async (req, res, next) => {
  console.log("id is", req.params?.id);
  const id = req.params?.id;
  const product = await ProductModel.findOne({ _id: id });
  const shopId = product?.shop?._id
  const totalProducts = await ProductModel.find({shop_id:shopId})
  const shopTotalProducts = totalProducts?.length
  const relatedProducts = await ProductModel.find({
    category: product?.category,
  });
  const data = { ...product?._doc, relatedProducts: relatedProducts, shop:{...product?._doc?.shop,total_products:shopTotalProducts }};
  console.log("product is", product);
  if (!product) {
    return next(customError(400, "Requested Product does not exist"));
  }
  return res.status(200).json({ success: true, data });
});

const SearchProducts = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit || 9;
  const startIndex = req.query.index || 0;

  const searchTerm = req.query.searchTerm || "";
  const category = req.query.category || ''

  let discount = req.query.discount === "true";
  if (!discount) {
    discount = { $in: [true, false] };
  }

  let sort = req.query.sortBy || "createdAt";
  let order = req.query.order || "desc";
  let best_selling = req.query.best_selling === 'true' 



  const query = {
    product_name:{
        $regex: searchTerm, $options: "i"
    },
    // discount
  }
  if(category){
    query.category = { $regex: category, $options: "i" }
  }



  const response = await ProductModel.find(query)
    .sort({ [sort]: order })
    .limit(limit)
    .skip(startIndex);

  return res.status(200).json({
    success: true,
    data: response,
  });
});

module.exports = {
  CreateProduct,
  GetProducts,
  DeleteProduct,
  getAllProducts,
  getProduct,
  SearchProducts,
};
