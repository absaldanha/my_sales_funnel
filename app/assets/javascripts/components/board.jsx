class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sales: [] }
    this.requestUpdateSale = this.requestUpdateSale.bind(this)
    this.handleNewSaleButtonClick = this.handleNewSaleButtonClick.bind(this)
    this.cancelNewSale = this.cancelNewSale.bind(this)
    this.requestCreateSale = this.requestCreateSale.bind(this)
  }

  componentDidMount() {
    fetch("/api/sales.json")
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ sales: data }) })
      .catch((error) => {
        this.props.handleNotification("error", "Houve um problema na recuperação dos negócios")
      });
  }

  render() {
    return(
      <div>
        <NewSaleButton handleNewSaleButtonClick={this.handleNewSaleButtonClick}>
          <ButtonImage />
        </NewSaleButton>
        <ColumnContainer
          sales={this.state.sales}
          renderNewSale={this.state.renderNewSale}
          handleCancelNewSale={this.cancelNewSale}
          handleCreateNewSale={this.requestCreateSale}
          handleNewSaleButtonClick={this.handleNewSaleButtonClick}
          handleNotification={this.props.handleNotification}
          handleDropOnColumn={this.requestUpdateSale}
        />
      </div>
    )
  }

  handleNewSaleButtonClick() {
    this.setState({ renderNewSale: true })
  }

  cancelNewSale() {
    this.setState({ renderNewSale: false })
  }

  requestCreateSale(title, clientName, value) {
    fetch("/api/sales.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sale: { title: title, client_name: clientName, value: value } })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        
        throw new Error
      })
      .then((sale) => { this.createSale(sale) })
      .then(() => { this.cancelNewSale() })
      .catch(() => { this.props.handleNotification("error", "Erro ao criar novo negócio") });
  }

  createSale(sale) {
    sales = this.state.sales
    sales.unshift(sale)

    this.setState({ sales: sales })
  }

  requestUpdateSale(id, status) {
    fetch(`api/sales/${id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sale: { status: status } })
    })
      .then((response) => { return response.json() })
      .then((sale) => this.updateSale(sale))
  }

  updateSale(sale) {
    sales = this.state.sales.filter((s) => s.id !== sale.id)
    sales.push(sale)

    this.setState({ sales: sales })
  }
}
