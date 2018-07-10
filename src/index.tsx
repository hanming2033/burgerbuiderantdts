import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/MainFrame/-App'
import './index.scss'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
// *aws amplify imports - download from mobile hub
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'

// *configure using mobilehub export
Amplify.configure(awsconfig)

// *aws appsync imports - download from AppSync
import AWSAppSyncClient, { createAppSyncLink, createLinkWithCache } from 'aws-appsync/lib'
import { withClientState } from 'apollo-link-state'
import appSyncConfig from './AppSync'
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

export const client = new AWSAppSyncClient({} as any, { link } as any)

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
