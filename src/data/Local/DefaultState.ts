// * DefaultState.ts
// create types in default state to prevent typo
export const types = {
  NETWORK_STATUS: 'NetworkStatus'
}

// create interface for state
interface IState {
  networkStatus: {
    __typename: string
    isConnected: boolean
  }
  addTodoText: string
}

// create default values for state
const defaultState: IState = {
  networkStatus: {
    __typename: types.NETWORK_STATUS,
    isConnected: true
  },
  addTodoText: ''
}

export default defaultState
