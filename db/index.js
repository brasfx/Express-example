import sqlite3 from 'sqlite3';
import md5 from 'md5';

sqlite3.verbose();

const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Conectado ao banco de dados!');
    db.run(
      `CREATE TABLE user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          registry INTEGER, 
          email TEXT UNIQUE, 
          password TEXT, 
          CONSTRAINT email_unique UNIQUE (email)
          )`,
      (err) => {
        if (err) {
        } else {
          const insert =
            'INSERT INTO user (name,registry, email, password) VALUES (?,?,?,?)';
          db.run(insert, [
            'Aluno 1',
            123456,
            'aluno1@furg.br',
            md5('aluno123456'),
          ]);
          db.run(insert, [
            'Aluno 2',
            234567,
            'aluno2@furg.br',
            md5('aluno234567'),
          ]);
        }
      }
    );
  }
});

export { db };
