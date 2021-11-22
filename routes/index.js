var express = require("express");
var router = express.Router();
const admin = true;
const productHelpers = require("../helpers/productHelpers");
const collection = require("../config/collection");

/* GET home page. */
router.get("/", function (req, res, next) {
  productHelpers.getMainCat().then((mainCat) => {
    res.render("admin/add-category", { admin, mainCat });
  });
});

router.post("/add-category/:maincat", (req, res) => {
  let response = {};
  productHelpers
    .catExist(req.body.category_name, collection.MAIN_CATEGORY_COLLECTION)
    .then((cat) => {
      if (!cat) {
        productHelpers
          .addCategory(req.body, collection.MAIN_CATEGORY_COLLECTION)
          .then((resp) => {
            res.json(resp);
          });
      } else {
        response.cat = true;
        res.json(response);
      }
    });
});

router.post("/add-category/:maincat/:subcat", (req, res) => {
  let response = {};
  req.body.main_category = req.body.mainId;
  productHelpers
    .catExist(req.body.category_name, collection.SUB_CATEGORY_COLLECTION)
    .then((cat) => {
      if (!cat) {
        productHelpers
          .addCategory(req.body, collection.SUB_CATEGORY_COLLECTION)
          .then((resp) => {
            res.json(resp);
          });
      } else {
        response.cat = true;
        res.json(response);
      }
    });
});

router.post("/get-subcat", (req, res) => {
  productHelpers.getSubCat(req.body.mainCat).then((subData) => {
    res.json(subData);
  });
});

router.post("/add-products/:maincategory/:subcategory/:product", (req, res) => {
  productHelpers
    .addCategory(req.body, collection.PRODUCT_COLLECTION)
    .then((response) => {
      res.json(response);
    });
});

module.exports = router;
