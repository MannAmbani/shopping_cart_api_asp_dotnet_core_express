const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');



const userRoutes = require('./routes/userRoute');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://mannambani007:hLFb623IKMlQXjRE@cluster0.tenux9l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Server connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


    app.use('/users', userRoutes);

    const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});