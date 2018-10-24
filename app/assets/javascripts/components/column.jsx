class Column extends React.Component {
  constructor(props) {
    super(props);
    this.newSaleRenderer = props.newSaleRenderer || false
    this.status = props.status
    this.handleDrop = this.handleDrop.bind(this)
    this.renderNewSale = this.renderNewSale.bind(this)
  }

  render() {
    return(
      <div className={`column ${this.props.column_class}`} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
        <div className={"columnName"}>
          <h3>{this.props.name}</h3>
        </div>
        <div className={"columnStats"}>
          <div className={"totalValue"}>{this.totalValue()}</div>
          <div className={"totalSales"}>{this.totalSales()}</div>
        </div>
        {this.renderNewSale()}
        {this.props.sales.map((sale) => {
        return(
          <div key={sale.id} >
            <Sale sale={sale} />
          </div>
        )
      })}
      </div>
    )
  }

  renderNewSale() {
    if (this.newSaleRenderer && this.props.renderNewSale) {
      return(
        <NewSale handleCancelNewSale={this.props.cancelNewSale} handleCreateNewSale={this.props.createNewSale} />
      )
    }
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

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    saleData = JSON.parse(event.dataTransfer.getData("saleData"))

    if (saleData.status !== this.status) {
      event.preventDefault();
      this.props.handleDrop(saleData.id, this.status)
    }
  }
}
