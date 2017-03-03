var Validator = require('jsonschema').Validator;

module.exports = function (req, res, next) {
  var controller = req.options.controller;
  var action = req.options.action;

  try {
    require.resolve('../validators/' + controller);
    var validator = require('../validators/' + controller);

    if (!validator[action]) {
      return next();
    }

    var v = new Validator();
    var result = v.validate(req.body, validator[action]);

    if (!result.valid) {
      return res.json({success: false, message: "Invalid json", errors: result.errors});
    }
    return next();

  } catch (e) {
    return next();
  }
};
