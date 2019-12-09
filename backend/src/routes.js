import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import MembershipController from './app/controllers/MembershipController';
import CheckinController from './app/controllers/CheckinController';
import OrderController from './app/controllers/OrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.post('/students/:id/help-orders', OrderController.store);
routes.get('/students/:id/help-orders', OrderController.index);

/**
 * Authentication middleware, all routes that
 * need authenticated user comes after this
 */
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/help-orders/:id/answer', AnswerController.store);
routes.get('/help-orders', AnswerController.index);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/memberships', MembershipController.store);
routes.get('/memberships', MembershipController.index);
routes.get('/memberships/:studentId', MembershipController.show);
routes.put('/memberships/:studentId', MembershipController.update);
routes.delete('/memberships/:studentId', MembershipController.delete);

export default routes;
