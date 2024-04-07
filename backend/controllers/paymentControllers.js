const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const CompanyModel = require("../models/companyModel");
const Boom = require("@hapi/boom");

const createPayment = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { dataCard, dataPackage, idCompany } = req.body;
  try {
    const testCardNumber = "42425656";
    const testCardHolder = "Juan Perez";
    const testExpirationDate = "12/25";
    const testCvv = "123";

    if (
      dataCard.cardNumber !== testCardNumber ||
      dataCard.cardHolder !== testCardHolder ||
      dataCard.expirationDate !== testExpirationDate ||
      dataCard.cvv !== testCvv
    ) {
      throw Boom.badRequest("Invalid card data");
    }

    const generateXCoupon = (x) => {
      const coupon = [];
      for (let i = 0; i < x; i++) {
        coupon.push(Math.random().toString(36).substr(2, 9));
      }
      return coupon;
    };

    const couponCompany = await CompanyModel.findById(idCompany);

    if (!couponCompany) {
      throw Boom.notFound("Product not found");
    }

    const user = await userModel.findById(_id);

    if (!user) {
      throw Boom.notFound("User not found");
    }

    const coupon = generateXCoupon(Number(dataPackage.cantidadBeneficio));

    const userCoupon = {
      coupon,
      idCompany,
    };

    user.couponAssigned.push(userCoupon);

    await user.save();

    return res.status(201).json({
      status: true,
      message: "Payment created successfully",
      coupon,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = {
  createPayment,
};
