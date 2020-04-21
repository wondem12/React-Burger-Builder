import React, { useEffect, useCallback, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Logout from "./components/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./components/Checkout/Checkout");
});

const Orders = React.lazy(() => {
  return import("./components/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./components/Auth/Auth");
});

const App = () => {
  const dispatch = useDispatch();

  const onTryAutoSignup = useCallback(() => dispatch(actions.authCheckState()),[dispatch]);

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
