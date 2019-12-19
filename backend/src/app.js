import './bootstrap';

import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import http from 'http';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.socket();
    this.middlewares();
    this.routes();

    this.connectedUsers = {};
    this.admin = [];
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id, origin = 'mobile' } = socket.handshake.query;

      if (origin === 'mobile') {
        this.connectedUsers[user_id] = socket.id;
      } else {
        this.admin.push(socket.id);
        socket.join('admin');
      }

      socket.on('disconnect', () => {
        if (origin === 'mobile') {
          delete this.connectedUsers[user_id];
        } else {
          this.admin.splice(socket.id, 1);
          socket.leave('admin');
        }
      });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      req.admin = this.admin;

      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
