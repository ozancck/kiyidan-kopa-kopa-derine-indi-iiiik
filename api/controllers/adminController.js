const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'temporary-secret-key', {
    expiresIn: '30d'
  });
};

// @desc    Register admin
// @route   POST /api/admin/register
// @access  Public
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const adminExists = await Admin.findOne({ username });
    
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    const admin = await Admin.create({
      username,
      password
    });
    
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    
    if (admin && (await admin.comparePassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};