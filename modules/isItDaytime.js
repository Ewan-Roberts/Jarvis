"use strict";const   moment  = require("moment"),        user    = require("./userInformation");module.exports = () => moment().isBetween(moment(user.daytime[0], "HH:mm"), moment(user.daytime[1], "HH:mm"));