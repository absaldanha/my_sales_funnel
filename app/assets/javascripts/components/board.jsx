class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sales: [] }
    this.handleDrop = this.handleDrop.bind(this)
  }

  componentDidMount() {
    fetch("/api/sales.json")
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ sales: data }) });
  }

  render() {
    return(
      <div>
        <NewSaleButton />
        <div className={"columnContainer"}>
          {this.boardColumn("Contato", "contact")}
          {this.boardColumn("Envio de proposta", "proposal_submission")}
          {this.boardColumn("Follow-up", "follow_up")}
          {this.boardColumn("Fechamento", "closing")}
          {this.boardColumn("Ganhos", "won", "columnGreen")}
          {this.boardColumn("Perdidos", "lost", "columnRed")}
        </div>
      </div>
    )
  }

  boardColumn(columnName, status, columnClass = "") {
    return(
      <Column
        name={columnName} column_class={columnClass}
        sales={this.state.sales.filter((sale) => sale.status === status)}
        status={status}
        handleDrop = {this.handleDrop}
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
