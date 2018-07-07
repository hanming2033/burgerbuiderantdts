import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/MainFrame/-App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'
// import { withClientState } from 'apollo-link-state'
// import { ApolloLink, Observable, Operation, NextLink, split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
// import { ApolloProvider } from 'react-apollo';
// import { AUTH_TOKEN } from './constants'
// import defaultState from './data/setup/DefaultState'
// import typeDefs from './data/setup/typeDefs'

// // define cache to use, default InMemor
// const cache = new InMemoryCache({})

// // setup authentication header
// const request = async (operation: Operation) => {
//   // in this case, auth token is stored in localStorage
//   const token = await localStorage.getItem(AUTH_TOKEN)
//   console.log(token ? `Bearer ${token}` : '')

//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   })
// }
// const requestLink = new ApolloLink(
//   (operation: Operation, forward: NextLink) =>
//     new Observable(observer => {
//       let handle: ZenObservable.Subscription
//       Promise.resolve(operation)
//         .then(oper => request(oper))
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer)
//           })
//         })
//         .catch(observer.error.bind(observer))

//       return () => {
//         if (handle) handle.unsubscribe()
//       }
//     })
// )

// // Create an http link
// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000',
//   credentials: 'include'
// })
// // Create a WebSocket link
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN)
//     }
//   }
// })
// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const linkSplit = split(
//   // split based on operation type
//   ({ query }) => {
//     const queryDefinition = getMainDefinition(query)
//     return queryDefinition.kind === 'OperationDefinition' && queryDefinition.operation === 'subscription'
//   },
//   wsLink,
//   httpLink
// )

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.map(({ message, locations, path }) =>
//           console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
//         )
//       if (networkError) console.log(`[Network error]: ${networkError}`)
//     }),
//     requestLink,
//     withClientState({
//       // setup apollo link state
//       defaults: defaultState,
//       resolvers: {},
//       typeDefs,
//       cache
//     }),
//     linkSplit // this is for subscription
//   ]),
//   cache
// })
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
// *aws amplify imports - download from mobile hub
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'

// *configure using mobilehub export
Amplify.configure(awsconfig)

// *aws appsync imports - download from AppSync
import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache } from 'aws-appsync'
import { withClientState } from 'apollo-link-state'
import appSyncConfig from './AppSync.js'
// import local state
import defaultState from './data/setup/DefaultState'
import typeDefs from './data/setup/typeDefs'

// create local state
const stateLink = createLinkWithCache((cache: any) =>
  withClientState({
    defaults: defaultState,
    resolvers: {},
    typeDefs,
    cache
  })
)

// subscription is enabled by default
const appSyncLink = createAppSyncLink({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
    // whenever appsync need to call backend, it will grab the token and verify user
    // congnito user group allows users to be grouped
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: ''
})

const link = ApolloLink.from([stateLink, appSyncLink])

const client = new AWSAppSyncClient({} as any, { link } as any)

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
