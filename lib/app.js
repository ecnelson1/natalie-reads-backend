const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();


app.use('/auth', authRoutes);
app.use('/api', ensureAuth);
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/books', async(req, res) => {
  try {
    const books = await client.query(`https://www.googleapis.com/books/v1/volumes?q=${req.query.keyword}`);
    
    res.json(books.body);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/favorites', async(req, res) => {
  try {
    const data = await client.query('SELECT * from favorites WHERE owner_id=$1 and id=$2', [req.userId, req.params.id]);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
