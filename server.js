const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Pro-SHR-creator-Bond-NS', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

// Use this to log mongo queries being excuted
mongoose.set('debug', true);
























app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });