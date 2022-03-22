var express = require('express');
var router = express.Router();
module.exports = router; 

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

/**
 * GET MESSAGES
 */
 router.get('/', (req, res, next) => {
  Message.find()
  .then(messages => {
    res.status(201).json({
        message: 'Message fetched successfully',
        messages: messages
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  });
});

/**
 * POST MESSAGE
 */
 router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const contact = new Contact({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  contact.save()
  .then(createdContact => {
    res.status(201).json({
      message: 'Contact added successfully',
      contact: createdContact
    });
  })
  .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
  });
});

/**
 * UPDATE/PUT MESSAGE
 */
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
  .then(contact => {
    message.name = req.body.name;
    message.description = req.body.description;
    message.url = req.body.url;

    Message.updateOne({ id: req.params.id }, message)
    .then(result => {
      res.status(204).json({
        message: 'Message updated successfully'
      })
    })
    .catch(error => {
        res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Document not found.',
      error: { document: 'Document not found'}
    });
  });
});

/**
 * DELETE MESSAGE
 */
router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
  .then(message => {
    Message.deleteOne({ id: req.params.id })
    .then(result => {
      res.status(204).json({
        message: "Message deleted successfully"
      });
    })
    .catch(error => {
        res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    })
  })
  .catch(error => {
    res.status(500).json({
      message: 'Document not found.',
      error: { document: 'Document not found'}
    });
  });
});