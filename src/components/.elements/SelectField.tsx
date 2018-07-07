// InputField Component
import * as React from 'react'
import { FieldProps } from 'formik'
import { Form, Select } from 'antd'
const FormItem = Form.Item

interface ISelectFieldProps {
  list: Array<{ value: string; name: string }>
}

const genOptionsComp = (list: Array<{ value: string; name: string }>) =>
  list.map(listItem => (
    <Select.Option key={listItem.value} value={listItem.value}>
      {listItem.name}
    </Select.Option>
  ))

const SelectField: React.SFC<FieldProps<any> & ISelectFieldProps> = ({
  field: { name, value }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[name] && errors[name]

  return (
    <FormItem validateStatus={errorMsg ? 'error' : undefined} help={errorMsg}>
      <Select value={value} {...props} onChange={inputVal => setFieldValue(name, inputVal)}>
        {genOptionsComp(props.list)}
      </Select>
    </FormItem>
  )
}

export default SelectField

/*
<FormItem validateStatus={touched.country && errors.country ? 'error' : undefined} help={touched.country && errors.country}>
<Select value={values.country} placeholder="Please select a country" onChange={value => setFieldValue('country', value)}>
  <Select.Option value="China">China</Select.Option>
  <Select.Option value="USA">U.S.A</Select.Option>
  <Select.Option value="Singapore">Singapore</Select.Option>
</Select>
</FormItem>
*/
