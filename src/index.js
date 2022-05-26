const express = require('express');
const Routes = require('./boleto.routes');
const app = express();

const port = 8080;

app.use(express.json());

app.use(Routes);

// app.get("/health", (req, res)=>{
//     return res.json('On');
// });

app.listen(port, ()=> console.log('Server up on port '+port));