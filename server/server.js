// Optional Node.js Express REST API Server with File-Based JSON Database
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Load DB
function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = { products: [], orders: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET All Products
app.get('/api/products', (req, res) => {
  const db = loadDB();
  res.json(db.products);
});

// POST New Product
app.post('/api/products', (req, res) => {
  const db = loadDB();
  const newProduct = {
    id: 'prod_' + Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.products.unshift(newProduct);
  saveDB(db);
  res.status(201).json(newProduct);
});

// PUT Update Product
app.put('/api/products/:id', (req, res) => {
  const db = loadDB();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...req.body };
    saveDB(db);
    res.json(db.products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// DELETE Product
app.delete('/api/products/:id', (req, res) => {
  const db = loadDB();
  db.products = db.products.filter(p => p.id !== req.params.id);
  saveDB(db);
  res.json({ message: 'Deleted successfully' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Shwapno Database Server running on http://localhost:${PORT}`);
});
