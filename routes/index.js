import express from 'express';
import controller from '../controllers/index.js';

const app = express();

app.get('/users', controller.getAllUsers);
app.get('/users/:id', controller.getUserById);
app.post('/user', controller.createUser);
app.patch('/user/:id', controller.updateUser);
app.delete('/user/:id', controller.deleteUser);

export { app as Routes };
