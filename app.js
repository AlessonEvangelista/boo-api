import express from 'express';
import { connect } from './database/conn.js';
import { profileRoutes } from './routes/profile.js';
import { commentRoutes } from './routes/comments.js';

const app = express();
const port =  process.env.PORT || 3000;

app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', profileRoutes);
app.use('/', commentRoutes);

// start server
connect().then(() =>{
    app.listen(port, () => {
        console.log(`Express started. Listening on ${port}`);
    });
}).catch((error) => {
    console.log('Error to connection %s', {error});
})



