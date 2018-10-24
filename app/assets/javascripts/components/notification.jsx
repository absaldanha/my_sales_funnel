const Notification = (props) => {
  if (props.show) {
    return(
      <div className="notificationContainer">
        <div className={`notification ${props.type}`}>
          {props.message}
          <button onClick={props.handleNotificationClose}>×</button>
        </div>
      </div>
    )
  }
  else {
    return("")
  }
}
