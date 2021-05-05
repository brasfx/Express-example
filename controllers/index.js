import { db } from '../db/index.js';
import md5 from 'md5';

const getAllUsers = (req, res, next) => {
  const sql = 'select * from user';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

const getUserById = (req, res, next) => {
  const sql = 'select * from user where id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};

const createUser = (req, res, next) => {
  const errors = [];
  const { name, registry, email, password } = req.body;
  if (!password) {
    errors.push('Senha não foi informada!');
  }
  if (!registry) {
    errors.push('Matricula não foi informada!');
  }
  if (!email) {
    errors.push('Email não foi informado!');
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(',') });
    return;
  }
  const data = {
    name: name,
    registry: registry,
    email: email,
    password: md5(password),
  };
  const sql =
    'INSERT INTO user (name, registry, email, password) VALUES (?,?,?,?)';
  const params = [data.name, data.registry, data.email, data.password];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      data: data,
      id: this.lastID,
    });
  });
};

const updateUser = (req, res, next) => {
  const { name, registry, email, password } = req.body;
  const data = {
    name: name,
    registry: registry,
    email: email,
    password: password ? md5(password) : null,
  };
  db.run(
    `UPDATE user set 
         name = COALESCE(?,name),
         registry = COALESCE(?,registry),  
         email = COALESCE(?,email), 
         password = COALESCE(?,password) 
         WHERE id = ?`,
    [data.name, data.registry, data.email, data.password, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        data: data,
        changes: this.changes,
      });
    }
  );
};

const deleteUser = (req, res, next) => {
  db.run('DELETE FROM user WHERE id = ?', req.params.id, function (
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: 'deleted', changes: this.changes });
  });
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
