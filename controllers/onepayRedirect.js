"use strict";

const errorResponseHandler = require('../utilities/pc-helpers/errorResponseHandler');
const transactionsModel = require("../models//transactions");

exports.onepayRedirect = async function (ctx) {
    try {
        const {
            amountFee,
            merchantId,
            tradeStatus,
            sign,
            signType,
            merchantTradeId,
            payEndTime,
            currency,
            pwTradeId,
            version
        } = ctx.request.query;

        let transactionStatus;
        switch (tradeStatus) {
            case "PS_PAYMENT_SUCCESS":
                transactionStatus = "SUCCESS";
                break;
            case "PS_PAYMENT_FAIL":
                transactionStatus = "FAIL";
                break;
            case "PS_GENERATE":
                transactionStatus = "PENDING";
                break;
            default:
                transactionStatus = "PENDING";
        }
        const transaction = await transactionsModel.getVendorOrderById(merchantTradeId);

        console.log(transaction);

        const responseData = {
            amount: transaction.amount,
            orderId: transaction.merchantOrderId,
            currency: transaction.currency,
            transactionStatus
        }

        console.log(responseData);

        const title = 'Redirecting...Please wait...';
        const actionURL = transaction.returnUrl;
        await ctx.render('redirectform', {
            title,
            actionURL,
            method: 'GET',
            returnData: responseData
        });
    } catch (error) {
        errorResponseHandler(ctx, error);
    }
};