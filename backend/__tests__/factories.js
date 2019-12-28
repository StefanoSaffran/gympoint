import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';
import Plan from '../src/app/models/Plan';
import Checkin from '../src/app/models/Checkin';

factory.define('User', User, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}));

factory.define('Student', Student, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(120),
  weight: faker.finance.amount(50, 250, 2),
  height: faker.finance.amount(1.2, 2.5, 2),
}));

factory.define('Plan', Plan, () => ({
  title: faker.random.word(),
  duration: faker.random.number({ min: 1, max: 12 }),
  price: faker.finance.amount(10, 200, 2),
}));

factory.define('Checkin', Checkin, {});

export default factory;
