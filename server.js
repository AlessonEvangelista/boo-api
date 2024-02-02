import express from 'express';
import { profileRoutes } from './routes/profile.js';
import { commentRoutes } from './routes/comments.js';
import profileModel from './models/profile.model.js';

const app = express();

app.use(express.json());

// set the view engine to ejs
// app.set('view engine', 'ejs');

// routes
app.use('/api/profile', profileRoutes);
app.use('/api/comments', commentRoutes);
app.use('/', (req, res) => {
    res.json({message: 'Api Working'})
});

export default app;
