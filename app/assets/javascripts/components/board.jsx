class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sales: [], renderNewSale: false }
    this.handleDrop = this.handleDrop.bind(this)
    this.handleNewSaleButtonClick = this.handleNewSaleButtonClick.bind(this)
  }

  componentDidMount() {
    fetch("/api/sales.json")
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ sales: data }) });
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
          {this.boardColumn({ name: "Perdidos", status: "lost", columnClass: "columnRed" })}
        </div>
      </div>
    )
  }

  handleNewSaleButtonClick() {
    this.setState({ renderNewSale: true })
  }

  boardColumn(attrs) {
    return(
      <Column
        name={attrs.name} column_class={attrs.columnClass || ""}
        sales={this.state.sales.filter((sale) => sale.status === attrs.status)}
        handleDrop={this.handleDrop}
        status={attrs.status}
        newSaleRenderer={attrs.newSaleRenderer}
        renderNewSale={this.state.renderNewSale}
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
}
