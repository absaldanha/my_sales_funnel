class Sale extends React.Component {
  render() {
    return(
      <div>
        <p>{this.props.sale.title}</p>
        <p>{this.props.sale.client_name}</p>
        <p>{this.moneyValue()}</p>
      </div>
    )
  }

  moneyValue() {
    value = this.props.sale.value / 100
    return(value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}))
  }
}
