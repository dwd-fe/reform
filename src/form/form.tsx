import * as React from 'react'
import { FormContext } from '../core/Context'
import FormData from '../core/formData'
import validate from '../validate'

const Form = (validateConfig?: any) => (WrapperComponent: any) => {
  let errorInfo: object = {}
  return class extends React.Component<any, any> {
    changeFormData = (changeData: any) => {
      errorInfo = changeData === null ? {} : Object.assign(errorInfo, validate(validateConfig || {}, changeData))
      this.setState({
        errorInfo,
      })
    }

    state = {
      formData: new FormData(),
      errorInfo,
      changeFormData: this.changeFormData,
    }

    render() {
      const { formData, errorInfo } = this.state
      let errorFields = {}
      Object.keys(errorInfo).forEach((r: any) => {
        if (errorInfo[r] !== '') {
          errorFields[r] = errorInfo[r]
        }
      })
      return (
        <FormContext.Provider value={this.state}>
          <WrapperComponent form={formData} errorFields={errorFields} {...this.props} />
        </FormContext.Provider>
      )
    }

    componentWillUnmount() {
      this.state = null
    }
  }
}

export default Form