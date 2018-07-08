import * as React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'antd'
import * as yup from 'yup'
import { FormikProps, FormikActions, Field } from 'formik'
import { Formik } from 'formik'
import { IIngredients } from '../../data/setup/DefaultState'
import Spacer from '../.elements/Spacer'
import InputField from '../.elements/InputField'
import SelectField from '../.elements/SelectField'
const FormItem = Form.Item

export interface IContactInfoProps {
  ingredients: IIngredients
  totalPrice: number
  cancelCheckout: () => void
}

interface IContactFormValues {
  email: string
  name: string
  address: string
  country?: string
  deliveryMethod?: string
}

const schemaContactForm = yup.object().shape({
  email: yup
    .string()
    .email('Not a valid email')
    .required(),
  name: yup
    .string()
    .min(3)
    .max(255)
    .required(),
  address: yup.string().required(),
  country: yup
    .string()
    .oneOf(['cn', 'us', 'sg'])
    .required(),
  deliveryMethod: yup
    .string()
    .oneOf(['singpost', 'fedex'])
    .required()
})

const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  @media (min-width: 600px) {
    width: 500px;
  }
`

const formContact = ({ isSubmitting, handleSubmit, isValid }: FormikProps<IContactFormValues>, cancelCheckout: () => void) => {
  return (
    <Form onSubmit={handleSubmit}>
      {/* Form */}
      <Field name="email" prefixicon="mail" placeholder="Email" component={InputField} />
      <Field name="name" prefixicon="user" placeholder="Name" component={InputField} />
      <Field name="address" prefixicon="environment-o" placeholder="Address" component={InputField} />
      <Field
        name="country"
        placeholder="Please select a country"
        list={[{ value: 'cn', name: 'China' }, { value: 'us', name: 'USA' }, { value: 'sg', name: 'Singapore' }]}
        component={SelectField}
      />
      <Field
        name="deliveryMethod"
        placeholder="Please select a delivery method"
        list={[{ value: 'singpost', name: 'Singpost' }, { value: 'fedex', name: 'Fedex' }]}
        component={SelectField}
      />
      <FormItem>
        <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={!isValid}>
          Submit Order
        </Button>
        <Spacer margin={'10px'} />
        <Button onClick={cancelCheckout} type="primary">
          Cancel
        </Button>
      </FormItem>
    </Form>
  )
}

const submitOrder = (values: IContactFormValues, formikBag: FormikActions<IContactFormValues>) => {
  console.log('order submitted...', values)
}

// need to give the prop types to the component
const ContactForm: React.SFC<IContactInfoProps & RouteComponentProps<{}>> = props => {
  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          name: '',
          address: '',
          country: undefined,
          deliveryMethod: undefined
        }}
        validationSchema={schemaContactForm}
        onSubmit={submitOrder}
        component={formikBag => formContact(formikBag, props.cancelCheckout)}
      />
    </Wrapper>
  )
}

// export default handleHttpError(Form.create()(ContactInfo), orderAxios)
export default ContactForm
