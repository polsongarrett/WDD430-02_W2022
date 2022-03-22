var express = require('express');
var router = express.Router();
module.exports = router; 

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

/**
 * GET CONTACTS
 */
 router.get('/', (req, res, next) => {
  Contact.find()
  .populate('group')
  .then(contacts => {
      res.status(201).json({
          message: 'Contact fetched successfully',
          contacts: contacts
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
 * POST CONTACT
 */
 router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
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
 * UPDATE/PUT CONTACT
 */
router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
  .then(contact => {
    contact.name = req.body.name;
    contact.description = req.body.description;
    contact.url = req.body.url;

    Contact.updateOne({ id: req.params.id }, contact)
      .then(result => {
        res.status(204).json({
          message: 'Contact updated successfully'
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
 * DELETE CONTACT
 */
router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
  .then(contact => {
    Contact.deleteOne({ id: req.params.id })
      .then(result => {
        res.status(204).json({
          message: "Contact deleted successfully"
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