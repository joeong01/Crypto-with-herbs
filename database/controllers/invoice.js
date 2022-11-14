import{
     getAllInvoice, getInvoice,  setInvoice, getInvoiceDetail, setInvoiceDetails,
} from "../models/invoiceModel.js";

export const showAllInvoice = (req, res) => {
    getAllInvoice((err, results) => {
        if (err) {
        res.send(err);
        } else {
        res.json(results);
        }
    });
};
  
export const showInvoice = (req, res) => {
    getInvoice( req.params.id, (err, results) => {
        if (err) {
        res.send(err);
        } else {
        res.json(results);
        }
    });
};

export const showInvoiceDetail = (req, res) => {
    getInvoiceDetail((err, results) => {
        if (err) {
        res.send(err);
        } else {
        res.json(results);
        }
    });
};


export const insertInvoice = (req, res) => {
    setInvoice(req.body, (err, results) => {
        if (err) {
        res.send(err);
        } else {
        res.json(results);
        }
    });
};

export const insertInvoiceDetails = (req, res) => {
    setInvoiceDetails(req.body, (err, results) => {
        if (err) {
        res.send(err);
        } else {
        res.json(results);
        }
    });
};