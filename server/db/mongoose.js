const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/cinemaze', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });