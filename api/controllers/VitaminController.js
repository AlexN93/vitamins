/**
 * VitaminController
 *
 * @description :: Server-side logic for managing vitamin lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  processVitamins: function (req, res) {
    VitaminService.findVitaminsRequest({request: req.body.vitamins}, function (item) {
      if (item) {
        res.json(item);
      }
      else {
        VitaminService.processVitamins(req.body, function (success) {
          res.json(success);
        });
      }
    });
  },

  getVitamins: function (req, res) {
    VitaminService.getVitaminRequests(function (items) {
      return res.json(200, {success: true, data: items});
    });
  },

  getVitamin: function (req, res) {
    var itemId = (req.param('itemId'));
    VitaminService.findVitaminsRequest({id: itemId}, function (item) {
      return res.json(200, {success: true, data: item});
    });
  }
};
