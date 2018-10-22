class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    }
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
      />
    )
  }
}
