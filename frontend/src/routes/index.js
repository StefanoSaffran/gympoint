import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import ManageStudent from '~/pages/Students/ManageStudent';
import Plans from '~/pages/Plans';
import ManagePlans from '~/pages/Plans/ManagePlans';
import Memberships from '~/pages/Memberships';
import ManageMembership from '~/pages/Memberships/ManageMembership';
import HelpOrders from '~/pages/HelpOrders';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/new" component={ManageStudent} isPrivate />
      <Route path="/students/:id" component={ManageStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/new" component={ManagePlans} isPrivate />
      <Route path="/plans/:id" component={ManagePlans} isPrivate />

      <Route path="/memberships" exact component={Memberships} isPrivate />
      <Route path="/memberships/new" component={ManageMembership} isPrivate />
      <Route
        path="/memberships/:studentId"
        component={ManageMembership}
        isPrivate
      />

      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  );
};

export default Routes;
