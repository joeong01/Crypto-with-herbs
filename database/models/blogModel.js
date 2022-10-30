import db from "../config/database.js";

export const getBlogs = (result) => {
    db.query("SELECT * FROM blog",
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const insertBlog = (data,result) => {
    db.query("INSERT INTO blog SET ?",
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

export const changeBlog = (data,result) => {
    db.query("UPDATE blog SET `title` = ? , `author` = ? , `content` = ? WHERE `id` = ?",
    [data.title, data.author, data.content, data.id],
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const deleteBlog = (data,result) => {
    db.query("DELETE fROM `blog` WHERE `id` = ?",
    [data.id],
    (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};