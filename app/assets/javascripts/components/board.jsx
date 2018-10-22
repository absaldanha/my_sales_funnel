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
        {this.boardColumn("Contato", "contact")}
        {this.boardColumn("Envio de proposta", "proposal_submission")}
        {this.boardColumn("Follow-up", "follow_up")}
        {this.boardColumn("Fechamento", "closing")}
        {this.boardColumn("Ganhos", "won")}
        {this.boardColumn("Perdidos", "lost")}
      </div>
    )
  }

  boardColumn(columnName, status) {
    return(
      <Column name={columnName} sales={this.state.sales.filter((sale) => sale.status === status)} />
    )
  }
}
