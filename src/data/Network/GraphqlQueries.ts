import gql from 'graphql-tag'

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      id
      type
    }
  }
`

export const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`
