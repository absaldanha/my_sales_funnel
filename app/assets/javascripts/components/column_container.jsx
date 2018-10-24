class ColumnContainer extends React.Component {
  render() {
    return(
      <div className="columnContainer">
        {this.newColumn({ name: "Contato", status: "contact", newSaleRenderer: true })}
        {this.newColumn({ name: "Envio de proposta", status: "proposal_submission" })}
        {this.newColumn({ name: "Follow-up", status: "follow_up" })}
        {this.newColumn({ name: "Fechamento", status: "closing" })}
        {this.newColumn({ name: "Ganhos", status: "won", columnClass: "columnGreen" })}
        {this.newColumn({ name: "Perdidos", status: "lost", columnClass: "columnRed", rejectStatuses: [] })}
      </div>
    )
  }

  newColumn(attrs) {
    return(
      <Column
        name={attrs.name} columnClass={attrs.columnClass || ""}
        sales={this.props.sales.filter((sale) => sale.status === attrs.status)}
        status={attrs.status}
        rejectStatuses={attrs.rejectStatuses || ["won"]}
        newSaleRenderer={attrs.newSaleRenderer}
        handleCreateNewSale={this.props.handleCreateNewSale}
        handleCancelNewSale={this.props.handleCancelNewSale}
        handleDropOnColumn={this.props.handleDropOnColumn}
        handleNotification={this.props.handleNotification}
        renderNewSale={this.props.renderNewSale}
      />
    )
  }
}
