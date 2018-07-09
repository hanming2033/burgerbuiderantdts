import * as React from 'react'
import { RouteComponentProps } from '../../../node_modules/@types/react-router'
import { Button } from 'antd'
import { AuthProxy } from '../Auth/AuthProxy'

interface IMyAccountProps {}

const MyAccount: React.SFC<IMyAccountProps & RouteComponentProps<{}>> = props => {
  console.log(props.history)
  const signOut = () => {
    AuthProxy.signOut()
    props.history.push('/')
  }
  return (
    <Button type="primary" onClick={signOut}>
      Sign Out
    </Button>
  )
}

export default MyAccount
