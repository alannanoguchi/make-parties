// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()

// require handlebars
var exphbs = require('express-handlebars');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// app.js

// OUR MOCK ARRAY OF PROJECTS
var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1510337550647-e84f83e341ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1565726166189-e9814a05ffde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }
  ]
  
// Index
app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('events-index', { events: events });
    })
  })

// NEW
app.get('/events/new', (req, res) => {
    res.render('events-new', {});
  })
  
// SHOW
app.get('/events/:id', (req, res) => {
    // Search for the event by its id that was passed in via req.params
    models.Event.findByPk(req.params.id).then((event) => {
      // If the id is for a valid event, show it
      res.render('events-show', { event: event })
    }).catch((err) => {
      // if they id was for an event not in our db, log an error
      console.log(err.message);
    })
  })

// UPDATE
app.put('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.update(req.body).then(event => {
        res.redirect(`/events/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const models = require('./db/models');


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


// CREATE
app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
      // Redirect to events/:id
      res.redirect(`/events/${event.id}`)
  
    }).catch((err) => {
      console.log(err)
    });
  })

// EDIT
app.get('/events/:id/edit', (req, res) => {
    models.Event.findByPk(req.params.id).then((event) => {
      res.render('events-edit', { event: event });
    }).catch((err) => {
      console.log(err.message);
    })
  });


// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})