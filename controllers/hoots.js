// controllers/hoots.js

const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Hoot = require("../models/hoot.js");
const router = express.Router();

// Create a new hoot
router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Get all hoots
router.get("/", verifyToken, async (req, res) => {
  try {
    const hoots = await Hoot.find({}).populate("author");
    res.status(200).json(hoots);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Get a specific hoot by ID
router.get("/:hootId", verifyToken, async (req, res) => {
  try {
    // populate author of hoot and comments
    const hoot = await Hoot.findById(req.params.hootId).populate([
      'author',
      'comments.author',
    ]);
    
    if (!hoot) {
      return res.status(404).json({ err: 'Hoot not found.' });
    }
    
    res.status(200).json(hoot);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Update a hoot
router.put("/:hootId", verifyToken, async (req, res) => {
  try {
    // Find the hoot:
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot) {
      return res.status(404).json({ err: 'Hoot not found.' });
    }

    // Check permissions:
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update hoot:
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    // Append req.user to the author property:
    updatedHoot._doc.author = req.user;

    // Issue JSON response:
    res.status(200).json(updatedHoot);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Delete a hoot
router.delete("/:hootId", verifyToken, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot) {
      return res.status(404).json({ err: 'Hoot not found.' });
    }

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// Add a comment to a hoot
router.post("/:hootId/comments", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    
    if (!hoot) {
      return res.status(404).json({ err: 'Hoot not found.' });
    }
    
    hoot.comments.push(req.body);
    await hoot.save();

    // Find the newly created comment:
    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
