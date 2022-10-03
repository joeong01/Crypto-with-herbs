import{
    getMerchant,
} from "../models/merchantModel.js";

export const showMerchant = (req, res) => {
    getMerchant((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };