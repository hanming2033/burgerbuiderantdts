import * as React from 'react'
import styled from 'styled-components'

interface IInputProps extends Partial<HTMLInputElement> {
  label: string
  inputType: 'input' | 'textarea'
}

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
`

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`

const InputEl = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 100%;

  &:focus {
    outline: none;
    background-color: #ccc;
  }
`

const Input: React.SFC<IInputProps> = (props: any) => {
  // set up dynamic input element based on the props passed in
  // this is good to minimize the code in the main component and render the form dynamically with state
  // test2 comment
  // one more comment
  let inputElement = null
  switch (props.inputType) {
    case 'input':
      inputElement = <InputEl {...props} />
      break
    case 'textarea':
      inputElement = <textarea {...props} />
      break
    default:
      inputElement = <input {...props} />
  }

  return (
    <Wrapper>
      <Label>{props.label}</Label>
      {inputElement}
    </Wrapper>
  )
}

export default Input
