"use strict";

var express = require('express');

var router = express.Router();

var bookModel = require('../models/Book.js');
/*
 * GET
 */


router.get('/', function (req, res) {
  bookModel.find(function (err, books) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting books.',
        error: err
      });
    }

    return res.json(books);
  });
});
/*
 * GET
 */

router.get('/:id', function (req, res) {
  var id = req.params.id;
  bookModel.findOne({
    _id: id
  }, function (err, book) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting book.',
        error: err
      });
    }

    if (!book) {
      return res.status(404).json({
        message: 'No such book'
      });
    }

    return res.json(book);
  });
});
/*
 * POST
 */

router.post('/', function (req, res) {
  var book = new bookModel({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    published_date: req.body.published_date,
    publisher: req.body.publisher,
    updated_date: req.body.updated_date
  });
  book.save(function (err, book) {
    if (err) {
      return res.status(500).json({
        message: 'Error when creating book',
        error: err
      });
    }

    return res.status(201).json(book);
  });
});
/*
 * PUT
 */

router.put('/:id', function (req, res) {
  var id = req.params.id;
  bookModel.findOne({
    _id: id
  }, function (err, book) {
    if (err) {
      return res.status(500).json({
        message: 'Error when getting book',
        error: err
      });
    }

    if (!book) {
      return res.status(404).json({
        message: 'No such book'
      });
    }

    book.isbn = req.body.isbn ? req.body.isbn : book.isbn;
    book.title = req.body.title ? req.body.title : book.title;
    book.author = req.body.author ? req.body.author : book.author;
    book.description = req.body.description ? req.body.description : book.description;
    book.published_date = req.body.published_date ? req.body.published_date : book.published_date;
    book.publisher = req.body.publisher ? req.body.publisher : book.publisher;
    book.updated_date = req.body.updated_date ? req.body.updated_date : book.updated_date;
    book.save(function (err, book) {
      if (err) {
        return res.status(500).json({
          message: 'Error when updating book.',
          error: err
        });
      }

      return res.json(book);
    });
  });
});
/*
 * DELETE
 */

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  bookModel.findByIdAndRemove(id, function (err, book) {
    if (err) {
      return res.status(500).json({
        message: 'Error when deleting the book.',
        error: err
      });
    }

    return res.status(204).json();
  });
});
module.exports = router;