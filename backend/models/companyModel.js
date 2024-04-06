const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    urlImagen: {
      type: String,
      required: true,
    },
    nombreEmpresa: {
      type: String,
      required: true,
    },
    benefit1Description: {
      type: String,
      required: true,
    },
    montoBeneficio1: {
      type: String,
      required: true,
    },
    batchBeneficio1: {
      type: String,
      required: true,
    },
    benefit2Description: {
      type: String,
      required: true,
    },
    montoBeneficio2: {
      type: String,
      required: true,
    },
    batchBeneficio2: {
      type: String,
      required: true,
    },
    benefit3Description: {
      type: String,
      required: true,
    },
    montoBeneficio3: {
      type: String,
      required: true,
    },
    batchBeneficio3: {
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

const CompanyModel = mongoose.model("Company", companySchema);
module.exports = CompanyModel;
