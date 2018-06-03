import * as React from 'react'
import { Query, Mutation, FetchResult } from 'react-apollo'
import { AUTH_TOKEN } from '../../data/setup/constants'
import { RouteComponentProps } from 'react-router'
import { GetSignUpInputsQuery, SignupUserMutation, SignupUserMutationVariables } from '../../data/clientSchema-types'
import { GET_SIGN_UP_INPUTS } from '../../data/Queries'
import { SIGNUP_USER } from '../../data/Mutations'
import InputEl from '../.elements/InputEl'
import { Button } from 'antd'

interface ISignupProps {}
export interface ISignupState {
  isSubmitting: boolean
}

class WithQuery extends Query<GetSignUpInputsQuery> {}
class WithSignUpMutation extends Mutation<SignupUserMutation, SignupUserMutationVariables> {}

class Signup extends React.Component<ISignupProps & RouteComponentProps<{}>, ISignupState> {
  public state = {
    isSubmitting: false
  }

  public render() {
    return (
      <WithQuery query={GET_SIGN_UP_INPUTS}>
        {qryRes => {
          if (qryRes.error || !qryRes.data) return <h1>Error!!</h1>

          // deconstruct the data object
          const {
            forms: { input_Signup_Email: email, input_Signup_Name: name, input_Signup_Password: password }
          } = qryRes.data

          return (
            <WithSignUpMutation mutation={SIGNUP_USER}>
              {(signup, mtnRes) => {
                return (
                  <>
                    <form
                      onSubmit={async e => {
                        e.preventDefault()
                        // clear password on submit
                        if (!qryRes.data) return
                        qryRes.client.writeData({ data: { ...qryRes.data, forms: { ...qryRes.data.forms, input_Signup_Password: '' } } })
                        // guarding the submit function so that users wont submit multiple times
                        if (this.state.isSubmitting) return
                        // setting the state to true so only first submit will trigger signup mutation
                        this.setState({ isSubmitting: true })
                        // wait for signup to return an response before setting isSubmitting to false
                        let response: FetchResult<SignupUserMutation> | void
                        try {
                          response = await signup({ variables: { email, name, password } })
                        } catch (error) {
                          console.log(error)
                          // call other function on error
                        }
                        // setting state iSubmitting to false because a reponse has been returned: pass or fail
                        this.setState({ isSubmitting: false })
                        // reset state using default state
                        if (!response || !response.data) return
                        qryRes.client.writeData({
                          data: {
                            ...qryRes.data,
                            forms: {
                              ...qryRes.data.forms,
                              input_Signup_Name: '',
                              input_Signup_Email: '',
                              input_Signup_Password: ''
                            }
                          }
                        })
                        // store the token in local storage
                        await localStorage.setItem(AUTH_TOKEN, response.data.signup.token)
                        // signup finish and push to a page
                        this.props.history.push('/')
                      }}
                    >
                      <InputEl value={name} qryRes={qryRes} keyName="input_Signup_Name" placeholder="Name" />
                      <br />
                      <InputEl value={email} qryRes={qryRes} keyName="input_Signup_Email" placeholder="Email" />
                      <br />
                      <InputEl type="password" value={password} qryRes={qryRes} keyName="input_Signup_Password" placeholder="Password" />
                      <br />
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </form>
                    <Button onClick={() => this.props.history.push('/login')}>Go to Login In</Button>
                    {mtnRes.loading && <p>Loading...</p>}
                    {mtnRes.error && <p>Error Please try again {mtnRes.error.message}</p>}
                  </>
                )
              }}
            </WithSignUpMutation>
          )
        }}
      </WithQuery>
    )
  }
}
export default Signup
