class NewSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValid: undefined,
      clientNameValid: undefined,
      valueValid: undefined
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.validateNewSale = this.validateNewSale.bind(this)
    this.inputClass = this.inputClass.bind(this)
  }

  render() {
    let formFields = {}

    return(
      <div className={"sale newSale"}>
        <form onSubmit={(e) => this.handleFormSubmit(e, formFields)}>
          <div className={"saleTitle"}>
            <input className={this.inputClass("title")} ref={input => formFields.title = input} placeholder="Título do negócio" autoFocus />
            <button input="submit" className={"iconButton"}>
              <CheckImage />
            </button>
            <button className={"iconButton"} onClick={this.props.handleCancelNewSale}>
              <CancelImage />
            </button>
          </div>
          <div className={"client"}>
            <CompanyImage />
            <input className={this.inputClass("clientName")} ref={input => formFields.clientName = input} placeholder="Nome do cliente" />
          </div>
          <div className={"saleValue"}>
            <input className={this.inputClass("value")} ref={input => formFields.value = input} placeholder="R$ 0,00" />
          </div>
        </form>
      </div>
    )
  }

  inputClass(input) {
    if (this.state[input + "Valid"] == false) {
      return("error")
    }
  }

  handleFormSubmit(event, form) {
    event.preventDefault();

    if (this.validateNewSale(form)) {
      this.props.handleCreateNewSale(
        form.title.value,
        form.clientName.value,
        form.value.value
      )
    }
  }

  validateNewSale(form) {
    let validations = {}

    validations.titleValid = form.title.value.trim() !== ""
    validations.clientNameValid = form.clientName.value.trim() !== ""
    validations.valueValid = form.value.value.trim() !== ""

    if (validations.titleValid && validations.clientNameValid && validations.valueValid) {
      return(true)
    }
    else {
      this.setState(validations)
      return(false)
    }
  }
}
