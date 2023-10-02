// routes/api/characters.js
const express = require('express');
const router = express.Router();
const Character = require('../../models/character.cjs'); 

// Create a new character
router.post('/', async (req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create character' });
  }
});

// Get all characters
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// Get a single character by ID
router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch character' });
  }
});

// Update a character by ID
router.put('/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update character' });
  }
});

// Delete a character by ID
router.delete('/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndRemove(req.params.id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json({ message: 'Character deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete character' });
  }
});

module.exports = router;
