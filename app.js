// Initialize express
const express = require('express')
const app = express()

// require handlebars
var exphbs = require('express-handlebars');

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
  
// INDEX
app.get('/', (req, res) => {
    res.render('events-index', { events: events });
  })

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})