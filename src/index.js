const express = require('express');
const morgan = require('morgan');
const app = express();
const getItems = require('./getItems');

app.set('view engine', 'ejs');

app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(morgan('tiny'));

app.get('/', (req, res) => {

  if (req.query.page !== undefined) {

    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const letter = req.query.item;

    if (limit > 200) {
      res.status(451);
      return res.end();
    }
    
    var items = getItems(limit, letter);
    let index = (page - 1) * 3;
    
    if ((index+3) <= limit) {
      return res.render('item', {
        items: items.slice(index, index+3)
      }); 
    }

    return res.render('item', {
      items: items.slice(index, limit+1)
    });
    
  }

  res.render('index', {
    currentPage: req.query.page
  });

});

app.listen(3000, () => {
  console.log('Running on port 3000');
});