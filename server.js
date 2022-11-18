const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/post', require('./routes/postRoute'));
app.use('/api/comment', require('./routes/commentRoute'));

const port = process.env.PORT || 4000;

app.get('/',(req, res)=>{
    res.send('blog server is running')
});

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})