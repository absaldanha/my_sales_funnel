class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotification: false,
      notificationMessage: "",
      notificationType: ""
    }
    this.handleNotificationClose = this.handleNotificationClose.bind(this)
    this.handleNotification = this.handleNotification.bind(this)
  }

  render() {
    return(
      <div>
        <Notification 
          show={this.state.showNotification}
          message={this.state.notificationMessage}
          type={this.state.notificationType}
          handleNotificationClose={this.handleNotificationClose}
        />
        <Board handleNotification={this.handleNotification}/>
      </div>
    )
  }

  handleNotificationClose() {
    this.setState({ showNotification: false })
  }

  handleNotification(type, message) {
    this.setState({ showNotification: true, notificationMessage: message, notificationType: type })
  }
}
