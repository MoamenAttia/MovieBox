const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/movie-box', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });