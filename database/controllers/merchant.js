import{
  getAllMerchant,
  getMerchant,
  setMerchant,
  changeMerchant,
  getMerchantCharge,
  getWallet,
  setFund,
  clearFund,
  setMerchantPlus,
  setMerchantMinus,
  silentMerchant,
} from "../models/merchantModel.js";

export const showAllMerchant = (req, res) => {
  getAllMerchant((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};


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
  setMerchant(req.body, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateMerchant = (req, res) => {
  changeMerchant(req.body, (err, results) => {
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
  setFund( req.body, (err, results) => {
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
export const disableMerchant = (req, res) => {
  silentMerchant(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};