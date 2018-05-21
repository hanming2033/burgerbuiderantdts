import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/MainFrame/-App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import defaultState from './data/Local/DefaultState'
import queries from './data/Local/Resolvers/Queries'
import mutation from './data/Local/Resolvers/Mutation'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: defaultState,
    resolvers: {
      Query: queries,
      Mutation: mutation
    }
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
