import * as React from 'react'
import { Form, Field, Formik, FormikActions, FormikProps } from 'formik'
import { Query, QueryResult } from 'react-apollo'
import { GetLocalStatesQuery } from '../../data/graphql-types'
import { GET_LOCAL_STATES } from '../../data/actions/Queries'
import * as yup from 'yup'
import { RouteComponentProps } from 'react-router'
import { AuthProxy, verifyUser } from './AuthProxy'
import { TChangeComponent, TSetAuth } from './AuthenticatorRouter'
import InputField from '../.elements/InputField'
import { Button } from 'antd'
import Spacer from '../.elements/Spacer'
import styled from 'styled-components'

// *1 define the form values interface
interface ISigninFormValues {
  email: string
  password: string
}

export interface ISignInProps {
  referrer: string
  setAuth: TSetAuth
  changeComponentTo: TChangeComponent
}

export interface ISignInState {}

// *2 define yup schema for form validation
const schemaSignup = yup.object().shape({
  email: yup
    .string()
    .email('Not a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required')
})

// *3 create actual form outsourced from Formik
const formSignin = ({ isSubmitting }: FormikProps<ISigninFormValues>) => (
  <Form>
    <Field name="email" placeholder="Email" component={InputField} />
    <Field type="password" name="password" placeholder="Password" component={InputField} />
    <Button type="primary" htmlType="submit" loading={isSubmitting}>
      Sign In
    </Button>
  </Form>
)

export const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  @media (min-width: 600px) {
    width: 500px;
  }
`

// *Component
class Signin extends React.Component<ISignInProps & RouteComponentProps<{}>, ISignInState> {
  // *4 create onsubmit method
  public login = async (
    values: ISigninFormValues,
    formikBag: FormikActions<ISigninFormValues>,
    qryRes: QueryResult<GetLocalStatesQuery>
  ) => {
    formikBag.setSubmitting(true)
    // store username in apollo link state on submit
    if (qryRes.data && qryRes.data.forms) {
      const newData: GetLocalStatesQuery = {
        ...qryRes.data,
        forms: {
          ...qryRes.data.forms,
          input_Email: values.email
        }
      }
      qryRes.client.writeData({ data: newData })
    }
    const res = await AuthProxy.signIn(values.email, values.password)
    if (res.data) {
      if (res.data.challengeName === 'SMS_MFA' || res.data.challengeName === 'SOFTWARE_TOKEN_MFA') {
        this.props.changeComponentTo('confirmSignIn') // TODO: check if mfa works
      } else if (res.data.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.props.changeComponentTo('requireNewPassword', res.data) // *good
      } else {
        verifyUser(res.data, this.props.changeComponentTo, this.props.setAuth) // *good
      }
    } else if (res.error) {
      formikBag.setSubmitting(false)
      formikBag.setFieldValue('password', '', false)
      formikBag.setErrors({
        email: res.error.code ? res.error.message : '',
        password: res.error.code === 'NotAuthorizedException' ? res.error.message : ''
      })

      if (res.error.code === 'UserNotConfirmedException') {
        this.props.changeComponentTo('confirmSignUp')
      }
    }
  }

  public render() {
    return (
      <Query<GetLocalStatesQuery> query={GET_LOCAL_STATES} fetchPolicy="no-cache">
        {qryRes => {
          if (qryRes.error) return <h1>Error!!</h1>
          if (!qryRes.data || !qryRes.data.forms) return null

          return (
            <>
              {/* // *5inject Formik component into view */}
              <Wrapper>
                <h1>Sign In</h1>
                <Formik
                  // get current user email from global state first
                  initialValues={{
                    email: qryRes.data.forms.input_Email || '',
                    password: ''
                  }}
                  validationSchema={schemaSignup}
                  onSubmit={(values, formikBag) => this.login(values, formikBag, qryRes)}
                  component={formSignin}
                />
                <div style={{ height: '10px' }} />
                <Button type="primary" htmlType="submit" onClick={() => this.props.changeComponentTo('forgotPassword')}>
                  Forgot Password
                </Button>
                <Spacer margin="5px" />
                <Button type="primary" htmlType="submit" onClick={() => this.props.changeComponentTo('signUp')}>
                  Go to SignUp
                </Button>
              </Wrapper>
            </>
          )
        }}
      </Query>
    )
  }
}

export default Signin
