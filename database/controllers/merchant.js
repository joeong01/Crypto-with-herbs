import{
  getMerchant,
  setMerchant,
  changeMerchant,
  getMerchantCharge,
  getWallet,
  setFund,
  clearFund,
  setMerchantPlus,
  setMerchantMinus,
  removeMerchant,
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

export const insertMerchant = (req, res) => {
  setMerchant(req.data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateMerchant = (req, res) => {
  changeMerchant(req.data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showMerchantCharge = (req, res) => {
  getMerchantCharge( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const getWalletID = (req, res) => {
  getWallet( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateFund = (req, res) => {
  setFund( req.data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const resetFund = (req, res) => {
  clearFund( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const plusMerchantProduct = (req, res) => {
  setMerchantPlus( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
export const minusMerchantProduct = (req, res) => {
  setMerchantMinus( req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
export const deleteMerchant = (req, res) => {
  removeMerchant(req.data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};