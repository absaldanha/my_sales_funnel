class Sale extends React.Component {
  constructor(props) {
    super(props)
    this.handleDragStart = this.handleDragStart.bind(this)
  }

  render() {
    return(
      <div className={"sale"} onDragStart={this.handleDragStart} draggable="true">
        <div className={"saleTitle"}>{this.props.sale.title}</div>
        <div className={"client"}>
          {this.props.children}
          {this.props.sale.client_name}
        </div>
        <div className={"saleValue"}>{this.moneyValue()}</div>
      </div>
    )
  }

  moneyValue() {
    value = this.props.sale.value / 100
    return(value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}))
  }

  handleDragStart(event) {
    event.dataTransfer.setData(
      "saleData",
      JSON.stringify({ id: this.props.sale.id, status: this.props.sale.status }
    )
  )
  }
}
