const express = require('express');
const User = require('../models/User');
const { userValidationRules, validate } = require('../middleware/validation');


const router = express.Router();

router.post('/users',
  
  userValidationRules(),
  validate,
  async (req, res) => {
    try {
      const user = await User.query().insert(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


router.get('/users',  async (req, res) => {
  try {
    const users = await User.query();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.query().findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/users/:id',
  
  userValidationRules(),
  validate,
  async (req, res) => {
    try {
      const user = await User.query().patchAndFetchById(req.params.id, req.body);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


router.delete('/users/:id',async (req, res) => {
  try {
    const user = await User.query().findById(req.params.id);
    if (user) {
      await User.query().deleteById(req.params.id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
