import * as React from 'react'
import { Form, Field, FormikProps, Formik, FormikActions } from 'formik'
import * as yup from 'yup'
import { Query, QueryResult } from 'react-apollo'
import { GET_LOCAL_STATES } from '../../data/actions/Queries'
import { GetLocalStatesQuery } from '../../data/graphql-types'
import { TChangeComponent } from './AuthenticatorRouter'
import { AuthProxy } from './AuthProxy'
import { Wrapper } from './SignIn'
import InputField from '../.elements/InputField'
import { Button } from 'antd'

interface ISignupFormValues {
  email: string
  password: string
  phone: string
}

export interface ISignupProps {
  changeComponentTo: TChangeComponent
}

export interface ISignupState {}

// yup schema for signup form validation
const schemaSignup = yup.object().shape({
  email: yup
    .string()
    .email('Not a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
  phone: yup.mixed().required()
})

// actual form for signup
const FormSignup = (formikProps: FormikProps<ISignupFormValues>) => (
  <Form>
    <Field name="email" placeholder="Email" component={InputField} />
    <Field name="password" placeholder="Password" type="password" component={InputField} />
    <Field name="phone" placeholder="Phone" component={InputField} />
    <Button type="primary" htmlType="submit" loading={formikProps.isSubmitting}>
      Sign Up
    </Button>
  </Form>
)

class Signup extends React.Component<ISignupProps, ISignupState> {
  // method to register user in AWS Cognito
  public signupSubmit = async (
    values: ISignupFormValues,
    formikBag: FormikActions<ISignupFormValues>,
    qryRes: QueryResult<GetLocalStatesQuery>
  ) => {
    formikBag.setSubmitting(true)
    // store email in link state
    if (qryRes.data && qryRes.data.forms) {
      const newData = {
        ...qryRes.data,
        forms: {
          ...qryRes.data.forms,
          input_Email: values.email
        }
      }
      qryRes.client.writeData({ data: newData })
    }

    const res = await AuthProxy.signUp({
      username: values.email,
      password: values.password,
      attributes: {
        name: 'name',
        phone_number: values.phone,
        email: values.email
      }
    })

    if (res.data) {
      formikBag.resetForm()
      formikBag.setSubmitting(false)
      this.props.changeComponentTo('confirmSignUp')
    } else if (res.error) {
      formikBag.setErrors({
        email: (res.error.message as string).includes('email') ? res.error.message : '',
        password: (res.error.message as string).includes('password') ? res.error.message : '',
        phone: (res.error.message as string).includes('phone number') ? res.error.message : ''
      })
      formikBag.setFieldValue('password', '', false)
      formikBag.setSubmitting(false)
    }
  }

  public render() {
    console.log('signup')
    return (
      <Query<GetLocalStatesQuery> query={GET_LOCAL_STATES}>
        {qryRes => {
          if (!qryRes.data || !qryRes.data.forms) return null
          return (
            <>
              <Wrapper>
                <h1>Sign Up</h1>
                <Formik
                  initialValues={{
                    email: qryRes.data.forms.input_Email,
                    password: '',
                    phone: '+65'
                  }}
                  validationSchema={schemaSignup}
                  onSubmit={(values, formikBag) => this.signupSubmit(values, formikBag, qryRes)}
                  component={FormSignup}
                />
                <Button onClick={() => this.props.changeComponentTo('confirmSignUp')}>Confirm a Code</Button>
                <Button onClick={() => this.props.changeComponentTo('signIn')}>Go to SignIn</Button>
              </Wrapper>
            </>
          )
        }}
      </Query>
    )
  }
}

export default Signup
