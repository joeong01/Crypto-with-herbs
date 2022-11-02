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
    db.query("SELECT * FROM invoice WHERE userID = ?",[id],
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getInvoiceDetail= (id, result) => {
    db.query("SELECT * FROM InvoiceDetail WHERE invoiceID = ?",[id],
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