const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

// open the db
const db = new sqlite.Database('db.sqlite', (err) => {
  if (err) throw err;
});

// retrieve all memes[public && protected]
exports.listAllMemes = () => new Promise((resolve, reject) => {
    const sql = "SELECT memes.id,memes.id_template,memes.title,memes.text0,memes.text1,memes.text2,memes.text3,memes.color,memes.font,memes.size,memes.isProtected,memes.image,memes.user, users.name FROM memes INNER JOIN users ON memes.user = users.id";
    db.all(sql,[], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }
        const memes = rows.map((m) => (
            {
                id: m.id,
                id_template: m.id_template,
                title: m.title,
                text0: m.text0,
                text1: m.text1,
                text2: m.text2,
                text3: m.text3,
                color: m.color,
                font: m.font,
                size: m.size,
                isProtected: m.isProtected,
                image: m.image,
                user: m.user,
                creator: m.name
            }));

        resolve(memes);
    });
});


// retrieve all public memes

exports.listAllPublicMemes = () => new Promise((resolve, reject) => {
    const sql = "SELECT memes.id,memes.id_template,memes.title,memes.text0,memes.text1,memes.text2,memes.text3,memes.color,memes.font,memes.size,memes.isProtected,memes.image,memes.user, users.name FROM memes INNER JOIN users ON memes.user = users.id WHERE isProtected = 0";
    db.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }
        const memes = rows.map((m) => (
            {
                id: m.id,
                id_template: m.id_template,
                title: m.title,
                text0: m.text0,
                text1: m.text1,
                text2: m.text2,
                text3: m.text3,
                color: m.color,
                font: m.font,
                size: m.size,
                isProtected: m.isProtected,
                image: m.image,
                user: m.user,
                creator: m.name
            }));

        resolve(memes);
    });
});

// retrieve all memes of a specified creator

exports.listAllMemesUser = (userId) => new Promise((resolve, reject) => {
    const sql = "SELECT memes.id,memes.id_template,memes.title,memes.text0,memes.text1,memes.text2,memes.text3,memes.color,memes.font,memes.size,memes.isProtected,memes.image,memes.user, users.name FROM memes INNER JOIN users ON memes.user = users.id WHERE user = ? ";
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            reject(err);
            return;
        }
        const memes = rows.map((m) => (
            {
                id: m.id,
                id_template: m.id_template,
                title: m.title,
                text0: m.text0,
                text1: m.text1,
                text2: m.text2,
                text3: m.text3,
                color: m.color,
                font: m.font,
                size: m.size,
                isProtected: m.isProtected,
                image: m.image,
                user: m.user,
                creator: m.name
            }));

        resolve(memes);
    });
});
// adding a meme
exports.addMeme = (userId, meme) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO memes(id,id_template,title,text0,text1,text2,text3,color,font,size,isProtected,image,user) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.run(sql, [
        this.lastID,
        meme.id_template,
        meme.title,
        meme.text0,
        meme.text1,
        meme.text2,
        meme.text3,
        meme.color,
        meme.font,
        meme.size,
        meme.isProtected,
        meme.image,
        userId],
        (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
});

//delete a meme
  exports.deleteMeme = (userId, memeId) => new Promise((resolve, reject) => {
    const sql = 'DELETE FROM memes WHERE user = ? AND id = ?';
    db.run(sql, [userId, memeId], (err) => {
      if (err) {
        reject(err);
      } else resolve(null);
    });
  });


// get user 
exports.getUser = (email, password) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        const user = { id: row.id, username: row.email, name: row.name };
        bcrypt.compare(password, row.password).then((result) => {
          if (result) {
            resolve(user);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  });
  
  // get user by id
  exports.getUserById = (id) => new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        const user = { id: row.id, username: row.email, name: row.name };
        resolve(user);
      } else {
        resolve({ err: 'User not found.' });
      }
    });
  });
