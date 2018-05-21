import { gql } from 'apollo-boost'

// Difference is the @client directive
// Query Network Status
export const GET_NETWORK_STATUS_CONNECTED = gql`
  query GetNetworkStatusConnected {
    networkStatus @client {
      isConnected
    }
  }
`
// local state query also need to have interface
// because codegen does not generate types for local state
export interface IGetNetworkStatusConnectedQuery {
  networkStatus: {
    isConnected: boolean
  }
}

// Query Add Todo input text
export const GET_INPUT_TEXT_ADD_TODO = gql`
  query GetInputTextAddTodo {
    addTodoText @client
  }
`

export interface IGetInputTextAddTodoQuery {
  addTodoText: string
}

// Mutation Network Status
export const TOGGLE_NETWORK_STATUS_CONNECTED = gql`
  mutation ToggleNetworkStatusConnected($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`
export interface IToggleNetworkStatusConnectMutation {
  isConnected: boolean
}
