import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/MainFrame/-App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable, Operation, NextLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloProvider } from 'react-apollo'
import { AUTH_TOKEN } from './constants'
import defaultState from './data/setup/DefaultState'
import typeDefs from './data/setup/typeDefs'

// Create an http link
const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})
// Create a WebSocket link
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
})
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const linkSplit = split(
  // split based on operation type
  ({ query }) => {
    const queryDefinition = getMainDefinition(query)
    return queryDefinition.kind === 'OperationDefinition' && queryDefinition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

// setup authentication header
const request = async (operation: Operation) => {
  // in this case, auth token is stored in localStorage
  const token = await localStorage.getItem(AUTH_TOKEN)
  operation.setContext({
    headers: {
      authorization: token
    }
  })
}
const requestLink = new ApolloLink(
  (operation: Operation, forward: NextLink) =>
    new Observable(observer => {
      let handle: ZenObservable.Subscription
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

// define cache to use, default InMemoryCache
const cache = new InMemoryCache({})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: message, Location: locations, Path: path`)
        )
      if (networkError) console.log(`[Network error]: networkError`)
    }),
    requestLink,
    withClientState({
      // setup apollo link state
      defaults: defaultState,
      resolvers: {},
      typeDefs,
      cache
    }),
    linkSplit
  ]),
  cache
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
