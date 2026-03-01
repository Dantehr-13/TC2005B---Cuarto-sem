const express = require('express');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const homeRoutes = require('./modules/home.routes');
const productsRoutes = require('./modules/products.routes');

app.use(homeRoutes);
app.use(productsRoutes);


app.use((req, res, next) => {
    res.status(404).render('404');
});

app.listen(3000);