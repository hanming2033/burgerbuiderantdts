import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/MainFrame/-App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/rootReducer'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

registerServiceWorker()
