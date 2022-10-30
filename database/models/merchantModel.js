import db from "../config/database.js";

export const getMerchant = (result) => {
  db.query("SELECT * FROM merchant",
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const setMerchant = (data,result) => {
  db.query("INSERT INTO merchant SET ?",
  [data],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const changeMerchant = (data,result) => {
  db.query("UPDATE merchant SET merchantName = ? , walletID = ? , platformCharges = ? WHERE merchantCategory = ?",
  [data.merchantName, data.walletID ,data.platformCharges ,data.merchantCategory],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const getMerchantCharge = (id,result) => {
  db.query("SELECT platformCharges FROM merchant WHERE merchantCategory = ?",
  [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getWallet = (id,result) => {
  db.query("SELECT walletID FROM merchant WHERE merchantCategory = ?",
  [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const setFund = (data,result) => {
  db.query("UPDATE merchant SET `fund` = `fund` + ? WHERE `merchantCategory` = ?",
  [data.fund, data.id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const clearFund = (id,result) => {
  db.query("UPDATE merchant SET `fund` = 0 WHERE `merchantCategory` = ?",
  [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const setMerchantPlus = (id,result) => {
  db.query("UPDATE merchant SET `totalProduct` = `totalProduct` + 1 WHERE `merchantCategory` = ?",
  [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const setMerchantMinus = (id,result) => {
  db.query("UPDATE merchant SET `totalProduct` = `totalProduct` - 1 WHERE `merchantCategory` = ?",
  [id],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const removeMerchant = (data,result) => {
  db.query("DELETE merchant  WHERE `merchantCategory` = ?",
  [data.is],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};