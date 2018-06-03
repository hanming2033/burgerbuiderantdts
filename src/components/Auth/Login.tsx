import * as React from 'react'
import { Query, Mutation, FetchResult } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import { AUTH_TOKEN } from '../../data/setup/constants'
import { GET_LOGIN_INPUTS } from '../../data/Queries'
import { LOGIN_USER } from '../../data/Mutations'
import { GetLoginInputsQuery, LoginUserMutation, LoginUserMutationVariables } from '../../data/clientSchema-types'
import InputEl from '../.elements/InputEl'
import { Button } from 'antd'

interface ILoginProps {}
interface ILoginState {
  isSubmitting: boolean
}

class WithLoginInput extends Query<GetLoginInputsQuery> {}
class WithLoginMutation extends Mutation<LoginUserMutation, LoginUserMutationVariables> {}

class Login extends React.Component<ILoginProps & RouteComponentProps<{}>, ILoginState> {
  public state = {
    isSubmitting: false
  }

  public render() {
    return (
      <WithLoginInput query={GET_LOGIN_INPUTS}>
        {qryRes => {
          if (qryRes.error || !qryRes.data) return <h1>Error...</h1>
          const {
            forms: { input_Login_Email: email, input_Login_Password: password }
          } = qryRes.data

          return (
            <WithLoginMutation mutation={LOGIN_USER}>
              {(login, mtnRes) => {
                return (
                  <form
                    onSubmit={async e => {
                      e.preventDefault()
                      // clear password on submit
                      if (!qryRes.data) return
                      qryRes.client.writeData({ data: { ...qryRes.data, forms: { ...qryRes.data.forms, input_Login_Password: '' } } })
                      // guarding the submit function so that users wont submit multiple times
                      if (this.state.isSubmitting) return
                      // setting the state to true so only first submit will trigger Login mutation
                      this.setState({ isSubmitting: true })
                      // wait for Login to return an response before setting isSubmitting to false
                      const response: FetchResult<LoginUserMutation> | void = await login({ variables: { email, password } })
                      // setting state iSubmitting to false because a reponse has been returned: pass or fail
                      this.setState({ isSubmitting: false })

                      if (!response || !response.data) return
                      // if payload is received
                      if (response.data.login.payload) {
                        // store the token in local storage
                        await localStorage.setItem(AUTH_TOKEN, response.data.login.payload.token)
                        // reset state using default state
                        qryRes.client.writeData({
                          data: {
                            ...qryRes.data,
                            forms: {
                              ...qryRes.data.forms,
                              input_Login_Email: '',
                              input_Login_Password: ''
                            }
                          }
                        })
                        this.props.history.push('/')
                      } else {
                        // do something with the error
                        console.log(response.data.login.error ? response.data.login.error.msg : 'No error message')
                        return
                      }
                    }}
                  >
                    <InputEl value={email} placeholder="Email" keyName="input_Login_Email" qryRes={qryRes} />
                    <br />
                    <InputEl type="password" value={password} placeholder="Password" keyName="input_Login_Password" qryRes={qryRes} />
                    <br />
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                    {mtnRes.loading && <p>Loading...</p>}
                    {mtnRes.data &&
                      mtnRes.data.login.error && (
                        <p>mtnRes.error will not work because error is passed in in data.. {mtnRes.data.login.error.msg}</p>
                      )}
                  </form>
                )
              }}
            </WithLoginMutation>
          )
        }}
      </WithLoginInput>
    )
  }
}

export default Login
