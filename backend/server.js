const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Import dotenv to load environment variables

const _dirname = path.resolve();

// Import route handlers for different endpoints
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const bookingRoute = require('./routes/booking');
const contactRoute = require('./routes/contact');

const app = express();

// Define the port for the server to listen on, using an environment variable or defaulting to 5000
const port = process.env.PORT || 5000;

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());

// Enable CORS to allow requests from different origins
app.use(cors());

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define routes for handling different API endpoints
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/booking', bookingRoute);
app.use('/contact', contactRoute);

// Serve static files for the frontend
app.use(express.static(path.join(_dirname, '/frontend/dist')));

// Handle all other routes with the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
