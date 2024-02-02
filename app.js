import app from "./server.js";
import { connect } from './database/conn.js';

const port =  process.env.PORT || 3000;

// start server
connect().then(() =>{
    app.listen(port, () => {
        console.log(`Express started. Listening on ${port}`);
    });
}).catch((error) => {
    console.log('Error to connection %s', {error});
})



