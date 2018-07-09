import * as React from 'react'
import Layout from './-Layout'
import { Switch, Redirect, Route } from 'react-router-dom'
import BurgerBuilder from '../BurgerBuilder/-BurgerBuilder'
import Checkout from '../Ordering/Checkout'
import Orders from '../Ordering/Orders'
import Signup from '../Auth/SignUp'
import Signin from '../Auth/SignIn'
import ProtectedRoute from '../Auth/AuthenticatorRouter'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Redirect from="/" exact to="/createburger" />
            <Redirect from="/home" exact to="/createburger" />
            <Route path="/createburger" component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <ProtectedRoute path="/orders" component={Orders} />
            <ProtectedRoute path="/signup" component={Signup} />
            <ProtectedRoute path="/login" component={Signin} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
