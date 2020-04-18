const express = require('express')
const app = express();
const path = require('path');
const PORT = process.env.PORT;
//Middleware
app.use(express.json());

//Route middleware
app.use('/api/user', require('./routes/login'));
app.use('/api/user', require('./routes/register'));
app.use('/api/user', require('./routes/logout'));
app.use('/api/user', require('./routes/deleteUser'));
app.use('/api/user/student', require('./routes/studentInfo'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Running on PORT: ${process.env.PORT}`));