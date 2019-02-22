const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// ========== Home Endpoint

server.get('/api', (req, res) => {
    res.send('API Running.')
});

// ========== Projects Endpoints

server.get('/api/projects', (req, res) => {
    db('projects')
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(() => {
        res.status(500).json({error: "Unable to retrieve projects."})
    })
});

server.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    db('projects')
      .where({'projects.id' : id})
      .then(project => {
        const thisProject = project[0];
        db('actions')
          .select(
            'actions.id',
            'actions.description',
            'actions.notes',
            'actions.complete',
            'actions.project_id'
          )
          .where({'actions.project_id' : id})
          .then(actions => {
            if (!thisProject) {
              res.status(404).json({ error: 'Project with specified id not found.' });
            } else {
              res.json({
                id: thisProject.id,
                name: thisProject.name,
                description: thisProject.description,
                complete: thisProject.complete,
                actions: actions
              });
            }
          });
      })
      .catch(() => {
        res
          .status(404)
          .json({ error: 'Info about this project could not be retrieved.' })
      });
  });

  server.post('/api/projects', (req, res) => {
      const project = req.body;
      if (!project.hasOwnProperty('name') || !project.hasOwnProperty('complete')) {
          res.status(400).json({error: 'Please add project properties <name> and <complete>.'})
      } else {
      db('projects').insert(project)
      .then(project => {
          res.status(201).json({id : project[0]})
      })
      .catch(() => {
          res.status(500).json({error: 'The project could not be created.'})
      })
    }
  });

// ========== Actions Endpoints

  server.get('/api/actions', (req, res) => {
      db('actions')
      .then(actions => {
          res.status(200).json(actions)
      })
      .catch(() => {
          res.status(500).json({error: 'Unable to retrieve actions.'})
      })
  });

  server.post('/api/actions', (req, res) => {
      const action = req.body;
      if (!action.hasOwnProperty('complete') || !action.hasOwnProperty('project_id')) {
          res.status(400).json({error: "Please add properties <complete> and <project_id> to the action"})
      } else {
      db('actions').insert(action)
      .then(project => {
        res.status(201).json({id : project[0]})
      })
      .catch(() => {
          res.status(500).json({error: 'The action could not be created.'})
      })
    }
  });

  
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n *** server running on port ${port} *** \n`));


