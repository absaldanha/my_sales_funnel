const NewSaleButton = (props) => {
  return(
    <button className={"button"} onClick={props.handleNewSaleButtonClick}>
      {props.children}
      <span>Adicionar negócio</span>
    </button>
  )
}
