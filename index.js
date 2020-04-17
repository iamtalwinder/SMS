const express = require('express')
const app = express();
const PORT = process.env.PORT;
//Middleware
app.use(express.json());

//Route middleware
app.use('/api/user', require('./routes/login'));
app.use('/api/user', require('./routes/register'));
app.use('/api/user', require('./routes/logout'));
app.use('/api/user', require('./routes/deleteUser'));
app.use('/api/user/student', require('./routes/studentInfo'));

app.listen(PORT, () => console.log(`Running on PORT: ${process.env.PORT}`));