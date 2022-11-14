import {
  getBlogs, insertBlog, changeBlog, deleteBlog,
} from "../models/blogModel.js"

export const showBlogs = (req, res) => {
  getBlogs((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const setBlog = (req, res) => {
  const data = req.body;
  insertBlog( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const updateBlog = (req, res) => {
  const data = req.body;
  changeBlog(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const removeBlog = (req, res) => {
  const data = req.body;
  deleteBlog( data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};