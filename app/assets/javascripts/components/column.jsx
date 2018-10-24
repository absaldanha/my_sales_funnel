class Column extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaleDrop = this.handleSaleDrop.bind(this)
    this.renderNewSale = this.renderNewSale.bind(this)
  }

  render() {
    return(
      <div className={`column ${this.props.column_class}`} onDrop={this.handleSaleDrop} onDragOver={this.handleDragOver}>
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
    if (this.props.newSaleRenderer && this.props.renderNewSale) {
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

  handleSaleDrop(event) {
    event.preventDefault();
    saleData = JSON.parse(event.dataTransfer.getData("saleData"))

    if (saleData.status == this.props.status) { return }

    if (this.props.rejectStatuses.includes(saleData.status)) {
      this.props.handleNotification(
        "error",
        `Um negócio ganho não pode ser movido para ${this.props.name}`
      )
      return
    }
      
    this.props.handleDrop(saleData.id, this.props.status)
  }
}
