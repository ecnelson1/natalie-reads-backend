const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { formatBook } = require('../data/mungeNificent.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); 

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
    const books = await request.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.keyword}`);
    const booksList = formatBook(books);
    res.json(booksList);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/favorites', async(req, res) => {
  try {
    const data = await client.query('SELECT * from favorites WHERE owner_id=$1', [req.userId]);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/favorites', async (req, res) => {
  const { 
    id,
    title, 
    description, 
    authors, 
    published, 
    pageCount,  
  } = req.body;
  try{
    const newFav = await client.query(`
    INSERT INTO favorites(
      title, 
      summary, 
      authors, 
      published, 
      pages, 
      bookId,  
      owner_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [
      title, 
      description, 
      authors, 
      published, 
      pageCount,  
      id,
      req.userId
    ]);
    res.json(newFav.rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/favorites/:id', async(req, res) => {
  try {
    const data = await client.query(
      'DELETE from favorites WHERE owner_id=$1 and id=$2 RETURNING *',
      [req.userId, req.params.id],
    );
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});




app.use(require('./middleware/error'));

module.exports = app;
