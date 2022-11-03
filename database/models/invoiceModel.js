import db from "../config/database.js";

export const getAllInvoice= (result) => {
    db.query("SELECT * FROM invoice ",
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};
export const getInvoice= (id, result) => {
    db.query("SELECT * FROM invoice WHERE userID = ? ORDER BY time DESC",[id] ,
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getInvoiceDetail= (result) => {
    db.query("SELECT * FROM invoicedetail ORDER BY invoiceID",
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const setInvoice = (data,result) => {
    db.query("INSERT INTO invoice SET ?",
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

export const setInvoiceDetails = (data,result) => {
    db.query("INSERT INTO invoicedetail SET ?",
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