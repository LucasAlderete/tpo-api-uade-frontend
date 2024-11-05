import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import User from '../pages/User';
import Products from '../pages/Products';

const AppRoutes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/user" component={User} />
      <Route path="/products" component={Products} />
    </Switch>
  </Router>
);

export default AppRoutes;