const express = require('express');
const mongoose = require('./config/mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 9337;
//middlewares
app.use(cors({origin: 'http://localhost:3000',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(require('./middlewares/auth'));
//routes

app.use(require('./routes/index'));
app.use(require('./routes/register'));
app.use(require('./routes/login'));
app.use(require('./routes/openai'));

app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});
