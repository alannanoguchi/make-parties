//  Be sure to import this file into app.js: require('./controllers/events')(app, models);
//  Migrate all the event routes from app.js into this file, be sure to follow above comment too
const moment = require('moment')

module.exports = function (app, models) {
    // // Index
    // app.get('/', (req, res) => {
    //     models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    //         res.render('events-index', { events: events });
    //     });
    // });

    // Index - using async and await
    app.get('/', async (req, res) => {
        try {
            events = await models.Event.findAll();
            return res.render('events-index', { events:events });


            // if (req.header('Content-type') == 'application/json') {
            //     return res.json({events})
            // } else {
            //     return res.render('events-index', {events:events})
            // }
        } catch(err) {
            return console.log(err)
        }
    });



    // // NEW
    // app.get('/events/new', (req, res) => {
    //     res.render('events-new', {});
    // });

    // NEW using async/await
    app.get('/events/new', async (req, res) => {
        try {
            res.render('events-new', {});
        } catch(err) {
            return console.log(err)
        }
    });

    
    // SHOW
    app.get('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
            let createdAt = event.createdAt;
            createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
            event.createdAtFormatted = createdAt;
            res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });


    // UPDATE
    app.post('/events/:id/update', (req, res) => {
        console.log(req.body)
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

    // // UPDATE with async and await
    // app.post('/events/:id/update', async (req, res) => {
    //     try {
    //         console.log(req.body)
    //         update = await models.Event.findByPk(req.params.id)
    //             event.update(req.body)
    //                 return res.redirect(`/events/${req.params.id}`);
    //     } catch(err) {
    //         return console.log(err)
    //     }
           
    // });
        


    // // CREATE
    // app.post('/events', (req, res) => {
    //     models.Event.create(req.body).then(event => {
    //     // Redirect to events/:id
    //         res.redirect(`/events/${event.id}`)
    
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    // });


    // CREATE - using async/await
    app.post('/events', async (req, res) => {
        try {
            event = await models.Event.create(res.body);
            event.save()
            return res.redirect(`/events/${event.id}`)
        } catch(err) {
            console.log(err)
        };
    });
    


    // EDIT
    app.get('/events/:id/edit', (req, res) => {
        models.Event.findByPk(req.params.id).then((event) => {
            res.render('events-edit', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });


    // DELETE
    app.get('/events/:id/delete', (req, res) => {
        models.Event.findByPk(req.params.id).then(event => {
            event.destroy();
            res.redirect(`/`);
        }).catch((err) => {
            console.log(err);
        });
    });

}

