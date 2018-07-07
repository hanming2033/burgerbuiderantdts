// InputField Component
import * as React from 'react'
import { FieldProps } from 'formik'
import { Form, Input, Icon } from 'antd'
const FormItem = Form.Item

interface IInputFieldProps {
  prefixicon: string
}

const InputField: React.SFC<FieldProps<any> & IInputFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name]
  return (
    <FormItem validateStatus={errorMsg ? 'error' : undefined} help={errorMsg}>
      <Input prefix={<Icon type={props.prefixicon} style={{ color: 'rgba(0,0,0,.25)' }} />} {...field} {...props} />
    </FormItem>
  )
}

export default InputField
