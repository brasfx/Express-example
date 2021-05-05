import express from 'express';
import controller from '../controllers/index.js';

const app = express();

app.get('/students', controller.getAllUsers);
app.get('/student/:id', controller.getUserById);
app.post('/student', controller.createUser);
app.patch('/student/:id', controller.updateUser);
app.delete('/student/:id', controller.deleteUser);

export { app as Routes };
