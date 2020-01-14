"use strict";

const axios = require("axios");
const variables = require("../variables");

exports.getVendorOrderById = async function(vendorOrderId) {
  const requestURL =
    variables.txAdapter + "/transaction/by-vendor-order-id/" + vendorOrderId;

  console.log(requestURL);

  const transactions = await axios.get(requestURL, { vendorOrderId });
  return transactions.data.data;
};
