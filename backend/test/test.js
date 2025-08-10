
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
// const Task = require('../models/Task');
// const { updateTask,getTasks,addTask,deleteTask } = require('../controllers/taskController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;


describe('Create resume', () => {
  it('should create a new resume successfully', async () => {
    console.log('create resume')
  });
})
