// middlewares/authMiddleware.js - Sadece backend kodu
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  let token;
  
  console.log('=== AUTH MIDDLEWARE DEBUG ===');
  console.log('Authorization header:', req.headers.authorization);
  
  // Authorization header'ını kontrol et
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token'ı ayıkla
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted token:', token ? 'Token exists' : 'No token');
      
      // JWT_SECRET kontrolü
      if (!process.env.JWT_SECRET) {
        console.log('ERROR: JWT_SECRET not found in environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
      }
      
      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully. Admin ID:', decoded.id);
      
      // Admin'i veritabanından bul
      req.admin = await Admin.findById(decoded.id).select('-password');
      
      if (!req.admin) {
        console.log('ERROR: Admin not found in database for ID:', decoded.id);
        return res.status(401).json({ message: 'Admin not found' });
      }
      
      console.log('AUTH SUCCESS - Admin found:', req.admin.email);
      next();
      
    } catch (error) {
      console.log('ERROR in token verification:', error.message);
      
      // Token süresi dolmuşsa özel mesaj
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired, please login again' });
      }
      
      // Geçersiz token
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      return res.status(401).json({ 
        message: 'Not authorized, token failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  } else {
    console.log('ERROR: No authorization header or invalid format');
    return res.status(401).json({ 
      message: 'Not authorized, no token provided',
      hint: 'Include Authorization: Bearer <token> in request headers'
    });
  }
};

// Token oluşturma fonksiyonu
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Admin login controller'da kullanım örneği
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Admin'i bul
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Şifre kontrolü (bcrypt kullanıyorsanız)
    const isPasswordValid = await admin.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Token oluştur
    const token = this.generateToken(admin._id);
    
    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};