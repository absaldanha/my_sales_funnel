class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sales: [], renderNewSale: false }
    this.handleDrop = this.handleDrop.bind(this)
    this.handleNewSaleButtonClick = this.handleNewSaleButtonClick.bind(this)
    this.cancelNewSale = this.cancelNewSale.bind(this)
    this.createNewSale = this.createNewSale.bind(this)
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
        <NewSaleButton handleNewSaleButtonClick={this.handleNewSaleButtonClick}/>
        <div className={"columnContainer"}>
          {this.boardColumn({ name: "Contato", status: "contact", newSaleRenderer: true })}
          {this.boardColumn({ name: "Envio de proposta", status: "proposal_submission" })}
          {this.boardColumn({ name: "Follow-up", status: "follow_up" })}
          {this.boardColumn({ name: "Fechamento", status: "closing" })}
          {this.boardColumn({ name: "Ganhos", status: "won", columnClass: "columnGreen" })}
          {this.boardColumn({ name: "Perdidos", status: "lost", columnClass: "columnRed", rejectStatuses: [] })}
        </div>
      </div>
    )
  }

  handleNewSaleButtonClick() {
    this.setState({ renderNewSale: true })
  }

  cancelNewSale() {
    this.setState({ renderNewSale: false })
  }

  createNewSale(title, client_name, value) {
    body = 

    fetch("/api/sales.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sale: { title: title, client_name: client_name, value: value } })
    })
      .then((response) => { return response.json() })
      .then((sale) => this.createSale(sale))
      .then(() => this.setState({ renderNewSale: false }))
  }

  boardColumn(attrs) {
    return(
      <Column
        name={attrs.name} column_class={attrs.columnClass || ""}
        sales={this.state.sales.filter((sale) => sale.status === attrs.status)}
        handleDrop={this.handleDrop}
        status={attrs.status}
        rejectStatuses={attrs.rejectStatuses || ["won"]}
        handleNotification={this.props.handleNotification}
        newSaleRenderer={attrs.newSaleRenderer}
        renderNewSale={this.state.renderNewSale}
        cancelNewSale={this.cancelNewSale}
        createNewSale={this.createNewSale}
      />
    )
  }

  handleDrop(id, status) {
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

  createSale(sale) {
    sales = this.state.sales
    sales.unshift(sale)

    this.setState({ sales: sales })
  }
}
