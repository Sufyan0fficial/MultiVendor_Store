const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true,
    },
    shop_id: {
      type: String,
      required: true,
    },

    customer_detail: {
      type: Object,
      required: true,
    },
    products: [
      {
        type: Object,
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      default: "Pending",
    },
    payment_status: {
      type: String,
      required: true,
    },
    shipping_address: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = new mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
