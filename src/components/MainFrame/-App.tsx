import * as React from 'react'
import Layout from './-Layout'
import { Switch, Redirect, Route } from 'react-router-dom'
import BurgerBuilder from '../BurgerBuilder/-BurgerBuilder'
import Checkout from '../Ordering/Checkout'
import Orders from '../Ordering/Orders'
import Signup from '../Auth/Signup'
import Login from '../Auth/Login'

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
            <Route path="/orders" component={Orders} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
