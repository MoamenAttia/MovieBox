const express = require('express')
const cors = require("cors");

require("./db/mongoose.js"); // importing the db
const userRouter = require("./routers/userRouter.js");
const movieRouter = require("./routers/movieRouter.js");
const screenRouter = require("./routers/screenRouter.js");

const app = express(); // configuring the server
const port = 3001;


// OMDB API KEY apikey=cf8ba8c7

app.use(cors());
app.use(express.json()); // to make the server deals w/ json without the need to call JSON.parse and stringify.
app.use(userRouter); // route contains all apis related w/ users
app.use(movieRouter); // route contains all apis related w/ movies
app.use(screenRouter); // route contains all apis related w/ screens

app.listen(port, () => console.log(`Server running on port ${port}`));
