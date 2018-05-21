// * Mutation.ts
// import { DataProxy } from 'apollo-cache'
import ApolloClient from 'apollo-boost'
import { GET_NETWORK_STATUS_CONNECTED, IGetNetworkStatusConnectedQuery } from '../Queries/AllLocalQueries'

// create multiple interfaces for different mutation
export interface IMutationVariables {
  isConnected: boolean
}

export interface IAnotherMutationVariables {}

// here is an example of 1 big mutation
// can use libs to split into different files
const mutation = {
  // ! Note: args is of no effect here. this mutation does not depend on it
  // ! this mutation simply takes the existing state's isConnected and reverse it
  // obj is not useful in local state so _:any
  // args is what is being passed in through variables:{isConnected:false}
  // client is the ApolloClient, it has a lot of useful methods like cache.readQuery or cache.writeQuery
  updateNetworkStatus: (_: any, args: IMutationVariables, client: ApolloClient<{}>) => {
    // client.cache.readQuery get value from cache of whatever the below query returns
    // store the query result as prevState
    const prevState: IGetNetworkStatusConnectedQuery | null = client.cache.readQuery({ query: GET_NETWORK_STATUS_CONNECTED })
    if (!prevState) return null

    // * writeData will only affect this query because of the normalization. No need to care of the rest of states
    // * e.g. this query will not affect the properties at the same level as networkStatus
    // reconstruct a new state immutably
    // can do it mutably too : prevState.networkStatus.isConnected = !prevState.networkStatus.isConnected
    const updatedData: IGetNetworkStatusConnectedQuery = {
      ...prevState, // this should be redundant
      networkStatus: {
        ...prevState.networkStatus,
        isConnected: !prevState.networkStatus.isConnected
      }
    }
    // finaly write the data into cache
    client.cache.writeData({
      data: updatedData
    })
    return null
  }
}

export default mutation
