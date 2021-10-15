const express = require('express');
const morgan = require('morgan'); // logging middleware
const session = require('express-session'); // session middleware
const { check, oneOf } = require('express-validator'); // validation middleware
const passport = require('passport');
const passportLocal = require('passport-local');

const dao = require('./dao');

passport.use(new passportLocal.Strategy((username, password, done) => {
  dao.getUser(username, password).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false, { message: 'Wrong username or password' });
    }
  }).catch((err) => {
    done(err);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dao.getUserById(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(null, err);
  });
});

const app = express();
const port = 3001;

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'not authenticated' });
};

app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));

app.use(session({
  secret: 'qzwsxedcrfvtgbyhnujmikol',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

//Retrieve the list of ALL the memes
app.get('/api/memes', isLoggedIn, [ check('id').isInt(), check('isProtected').isInt(), check('user').isInt() ], (req, res) => {
  dao.listAllMemes()
      .then( (memes) => {res.json(memes);} )
      .catch( (error) => {res.status(500).json(error);} );
});
//Retrieve the list of ALL PUBLIC the memes
app.get('/api/memes/public', [ check('id').isInt(), check('isProtected').isInt(), check('user').isInt() ], (req, res) => {
  dao.listAllPublicMemes()
      .then( (memes) => {res.json(memes);} )
      .catch( (error) => {res.status(500).json(error);} );
});

//Retrieve the list of ALL memes of an user
app.get('/api/memes/user', isLoggedIn, [ check('id').isInt(), check('isProtected').isInt(), check('user').isInt() ], (req, res) => {
  const userId = req.user.id;
  dao.listAllMemesUser(userId)
      .then( (memes) => {res.json(memes);} )
      .catch( (error) => {res.status(500).json(error);} );
});


// create a new meme

app.post('/api/memes', isLoggedIn, 
[ 
check('id').isInt(), 
check('id_template').isNumeric(), 
check('title').not().isEmpty(), 
oneOf([check('text0').not().isEmpty(),check('text1').not().isEmpty(),check('text2').not().isEmpty(),check('text3').not().isEmpty()]),
check('color').not().isEmpty(), 
check('font').not().isEmpty(),
check('size').not().isEmpty(), 
check('isProtected').isInt(),
check('image').not().isEmpty(), 
check('user').isInt() 
], async (req, res) => {
  const userId = req.user.id;
  const text0 = req.body.text0 === undefined ? null : req.body.text0;
  const text1 = req.body.text1 === undefined ? null : req.body.text1;
  const text2 = req.body.text2 === undefined ? null : req.body.text2;
  const text3 = req.body.text3 === undefined ? null : req.body.text3;
  const meme = {
    id_template: req.body.id_template,
    title: req.body.title,
    text0: text0,
    text1: text1,
    text2: text2,
    text3: text3,
    color: req.body.color,
    font: req.body.font,
    size: req.body.size,
    isProtected: req.body.isProtected,
    image: req.body.image,
  };

  try {
    await dao.addMeme(userId, meme);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({error: `Database error during the creation of meme: ${meme.title}.`});
  }
});

// delete a meme
app.delete('/api/memes/:id', isLoggedIn, [ check('id').isInt() ], async (req, res) => {
  const userId = req.user.id;
  const memeId = req.params.id;

  try {
    await dao.deleteMeme(userId, memeId);
    res.status(204).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the deletion of meme: ${req.params.id}.` });
  }
});

/**
 * Users APIs
 */

/* POST /api/sessions */
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

/* DELETE /api/sessions/current */
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

/* GET /api/sessions/current */
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
  res.json(req.user);
});

app.listen(port, () => { console.log(`Server running on http://localhost:${port}/`); });