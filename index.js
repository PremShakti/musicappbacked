const express = require('express');
const { Routerplay } = require('./Routers/playsong');
const app = express();
require('dotenv').config()
const cors=require('cors')
let PORT=process.env.PORT
app.use(express.json())
app.use(cors())
app.use('/',Routerplay)




// Start the server
app.listen(PORT||8080, () => {
try {
    console.log(`server is running on port ${PORT}`);
} catch (error) {
    console.log(error)
}

  
});
