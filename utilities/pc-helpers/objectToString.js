"use strict";

const crypto = require("crypto");

exports.objectToParamString = requestObj => {
    const paramString = Object.entries(requestObj)
        .sort((a, b) => b[0] < a[0])
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
    return paramString;
};
