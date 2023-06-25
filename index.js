const express = require('express');
const { Routerplay } = require('./Routers/playsong');
const app = express();
require('dotenv').config()
const cors=require('cors')
app.use(cors())
let PORT=process.env.PORT
app.use(express.json())
app.use('/',Routerplay)




// Start the server
app.listen(8080, () => {
try {
    console.log(`server is running on port 8080`);
} catch (error) {
    console.log(error)
}

  
});
