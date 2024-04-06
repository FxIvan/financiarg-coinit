const asyncHandler = require("express-async-handler");
const CompanyModel = require("../models/companyModel");
const Boom = require("@hapi/boom");

const createPromotion = asyncHandler(async (req, res, next) => {
  const form = req.body;
  try {
    const promotion = await CompanyModel.create({
      urlImagen: form.urlImagen,
      nombreEmpresa: form.nombreEmpresa,
      benefit1Description: form.benefit1Description,
      montoBeneficio1: form.montoBeneficio1,
      batchBeneficio1: form.batchBeneficio1,
      benefit2Description: form.benefit2Description,
      montoBeneficio2: form.montoBeneficio2,
      batchBeneficio2: form.batchBeneficio2,
      benefit3Description: form.benefit3Description,
      montoBeneficio3: form.montoBeneficio3,
      batchBeneficio3: form.batchBeneficio3,
    });

    return res.status(201).json({
      status: true,
      message: "Promotion created successfully",
      promotion,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = { createPromotion };
