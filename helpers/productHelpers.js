const db = require("../config/connection");
const collection = require("../config/collection");
const objId = require("mongodb").ObjectId;

module.exports = {
  addCategory: (cat, collId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collId)
        .insertOne(cat)
        .then((response) => {
          response ? resolve(true) : reject(false);
        })
        .catch((err) => console.log(err));
    });
  },
  catExist: (cat, collId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collId)
        .findOne({
          category_name: cat,
        })
        .then((cat) => {
          cat ? resolve(true) : resolve(false);
        })
        .catch((err) => console.log(err));
    });
  },
  getMainCat: () => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.MAIN_CATEGORY_COLLECTION)
        .find()
        .toArray()
        .then((mainCat) => {
          resolve(mainCat);
        });
    });
  },
  getSubCat: (mainCat) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.SUB_CATEGORY_COLLECTION)
        .find({
          main_category: mainCat,
        })
        .toArray()
        .then((subCat) => {
          resolve(subCat)
        });
    });
  },
};
