class Column extends React.Component {
  render() {
    return(
      <div>
        <h3>{this.props.name}</h3>
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
}
