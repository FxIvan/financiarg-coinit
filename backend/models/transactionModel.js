const transactionModal = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Coupon",
    },
    couponCode: {
      type: String,
      required: true,
    },
    couponAmount: {
      type: Number,
      required: true,
    },
    couponBatch: {
      type: String,
      required: true,
    },
    couponBenefit: {
      type: String,
      required: true,
    },
    couponExpiration: {
      type: Date,
      required: true,
    },
    couponStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const TransactionModel = mongoose.model("Transaction", transactionModal);

module.exports = TransactionModel;
