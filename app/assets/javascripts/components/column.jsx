class Column extends React.Component {
  render() {
    return(
      <div className={`column ${this.props.column_class}`}>
        <div className={"columnName"}>
          <h3>{this.props.name}</h3>
        </div>
        <div className={"columnStats"}>
          <div className={"totalValue"}>{this.totalValue()}</div>
          <div className={"totalSales"}>{this.totalSales()}</div>
        </div>
        {this.props.sales.map((sale) => {
        return(
          <div key={sale.id}>
            <Sale sale={sale} />
          </div>
        )
      })}
      </div>
    )
  }

  totalValue() {
    total = this.props.sales.reduce((acc, sale) => acc + sale.value, 0)
    return((total / 100).toLocaleString("pt-BR", {style: "currency", currency: "BRL"}))
  }

  totalSales() {
    count = this.props.sales.length
    if (count > 1 || count == 0) {
      sales = "negócios"
    }
    else {
      sales = "negócio"
    }

    return(`${count} ${sales}`)
  }
}
