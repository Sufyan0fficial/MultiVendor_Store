const asyncWrapper = require("../Middleware/asyncWrapper");
const customError = require("../utils/customError");
const SellerModel = require("../Models/seller.model");
const EventModel = require("../Models/event.model");

const CreateEvent = asyncWrapper(async (req, res, next) => {
  const files = req.files;
  console.log("files are", files);
  const images = files?.map((item) => item?.filename);
  const data = req.body;
  const ShopData = await SellerModel.findById(data?.shop_id);
  if (!ShopData) {
    return next(customError(400, "Shop does not exist"));
  }
  const EventData = data;
  EventData.images = images;
  EventData.shop = ShopData;

  const response = await EventModel.create(EventData);
  return res
    .status(201)
    .json({
      success: true,
      message: "Event created successfully",
      data: response?._doc,
    });
});

const GetEvents = asyncWrapper(async (req, res, next) => {
  const id = req.params?.id;
  const ShopData = await SellerModel.findById(id);
  if (!ShopData) {
    return next(customError(400, "Shop does not exist"));
  }
  const events = await EventModel.find({ shop_id: id });
  return res.status(200).json({ success: true, data: events });
});
const GetAllEvents = asyncWrapper(async (req, res, next) => {
  let limit = req.query.limit || 9;
  let sort = "createdAt";
  let order = "desc";
  let startIndex = req.query.startIndex || 0;
  const popular = req.query.popular === "true";
  if (popular) {
    limit = 1;
    sort = "sold_out";
  }
  const events = await EventModel.find()
    .limit(limit)
    .skip(startIndex)
    .sort({ [sort]: order });
  return res.status(200).json({ success: true, data: events });
});

const DeleteEvent = asyncWrapper(async (req, res, next) => {
  const id = req.params?.id;
  const event = await EventModel.findById(id);
  if (!event) {
    return next(customError(404, "Requested Event for delete does not exist"));
  }
  const shopID = event?.shop_id;
  await EventModel.findOneAndDelete({ _id: id });
  const allEvents = await EventModel.find({ shop_id: shopID });
  return res
    .status(200)
    .json({
      success: true,
      message: "Event Deleted Successfully",
      data: allEvents,
    });
});

module.exports = {
  CreateEvent,
  GetEvents,
  DeleteEvent,
  GetAllEvents,
};
