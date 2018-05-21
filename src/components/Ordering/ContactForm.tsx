import * as React from 'react'
import styled from 'styled-components'
import { IBurgerProps } from '../BurgerBuilder/BurgerDisplay/Burger'
import orderAxios from '../../http/axios-order'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Select, Icon, Input, Progress, Button } from 'antd'
import handleHttpError from '../../http/handleHttpError'
// tslint:disable-next-line:no-submodule-imports
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item

export interface IContactInfoProps {
  totalPrice: number
}

export interface IContactInfoState {
  loading: boolean
}

const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  @media (min-width: 600px) {
    width: 500px;
  }
`

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

// need to give the prop types to the component
class ContactInfo extends React.Component<
  IContactInfoProps & IBurgerProps & RouteComponentProps<{}> & FormComponentProps,
  IContactInfoState
> {
  public state = {
    loading: false
  }

  public componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  // do not use onChange or value to sync state because antd form handles its own state
  public handleOrderSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ loading: true })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const order = { ingredients: this.props.ingredients, price: this.props.totalPrice, orderData: values }
        orderAxios
          .post('orders.json', order)
          .then(res => {
            this.setState({ loading: false })
            this.props.history.push('/orders')
          })
          .catch(error => {
            this.setState({ loading: false })
          })
      }
    })
  }

  public render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    // this is a boolean value to determine the validateStatus
    const nameError = isFieldTouched('name') && getFieldError('name')
    const streetError = isFieldTouched('street') && getFieldError('street')
    const zipCodeError = isFieldTouched('zipCode') && getFieldError('zipCode')
    const countryError = isFieldTouched('country') && getFieldError('country')
    const emailError = isFieldTouched('email') && getFieldError('email')
    const deliveryError = isFieldTouched('delivery') && getFieldError('delivery')

    return (
      <Wrapper>
        {this.state.loading && <Progress percent={50} status="active" />}
        <Form onSubmit={this.handleOrderSubmit}>
          {/* each form element must be wrapped with Form.Item  */}
          <FormItem validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
            {/* the main this here, getFieldDecorator creates a property in form's state using the id */}
            {/* with some other properties like rules */}
            {/* this then wraps the actual element like input */}
            {/* if do not wish to use form, simply use the individual elements and apply form validation */}
            {getFieldDecorator('email', {
              rules: [{ type: 'email', required: true, message: 'Please input your email!' }]
            })(<Input type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Emaill Address" />)}
          </FormItem>
          <FormItem validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
            {getFieldDecorator('name', {
              rules: [{ min: 3, required: true, message: 'Please input your name!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />)}
          </FormItem>
          <FormItem validateStatus={streetError ? 'error' : ''} help={streetError || ''}>
            {getFieldDecorator('street', {
              rules: [{ required: true, message: 'Please input your street!' }]
            })(<Input prefix={<Icon type="environment-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Street" />)}
          </FormItem>
          <FormItem validateStatus={zipCodeError ? 'error' : ''} help={zipCodeError || ''}>
            {getFieldDecorator('zipCode', {
              rules: [{ required: true, message: 'Please input your zip code!' }]
            })(<Input prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Zip Code" />)}
          </FormItem>
          <FormItem validateStatus={countryError ? 'error' : ''} help={countryError || ''}>
            {getFieldDecorator('country', {
              rules: [{ required: true, message: 'Please select your country!' }]
            })(
              <Select placeholder="Please select a country">
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="usa">U.S.A</Select.Option>
                <Select.Option value="singapore">Singapore</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem validateStatus={deliveryError ? 'error' : ''} help={deliveryError || ''}>
            {getFieldDecorator('delivery', {
              rules: [{ required: true, message: 'Please select your delivery method!' }]
            })(
              <Select placeholder="Please select a delivery method">
                <Select.Option value="singpost">Singpost</Select.Option>
                <Select.Option value="fedex">Fedex</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              Order
            </Button>
          </FormItem>
        </Form>
      </Wrapper>
    )
  }
}

export default handleHttpError(Form.create()(ContactInfo), orderAxios)
