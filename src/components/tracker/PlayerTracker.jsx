import React from "react"
import axios from "axios"

import UserForm from "./UserForm.jsx"
import UserData from "./UserData.jsx"
import "./PlayerTracker.css"


const platformNames = {
  PC: "Steam/Origin",
  PS4: "PlayStation 4",
  X1: "Xbox One",
}


// TODO: add UID functionality
class PlayerTracker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      platform: "",
      data: null,

      loading: false,

      showUserData: false,
    }

    this.getUserData = this.getUserData.bind(this)
    this.renderUserData = this.renderUserData.bind(this)
    this.backToUserForm = this.backToUserForm.bind(this)
  }

  // TODO: serach by UID
  getUserData(username, platform) {
    this.setState({
      data: null,
      loading: true,   
      username,
      platform,
    }, () => {
      axios
        .get(`https://avsecam-express-server.herokuapp.com/user-data?platform=${platform}&username=${username}`)
        .then(res => this.setState({
          data: res,
          loading: false,
        }))
        .catch(() => {
          this.setState({
            loading: false,
          })
        })
    })
  }

  renderError() {
    const ERR_EXISTS_BUT_HAS_NOT_PLAYED = "Player exists but has never played Apex Legends"
    var data = this.state.data
    var username = this.state.username
    var platform = this.state.platform
    var errorMessage
    if (!username || !platform || data?.data.global || this.state.loading) return
    if (data?.data.Error.startsWith(ERR_EXISTS_BUT_HAS_NOT_PLAYED)) {
      errorMessage = `Player ${username} exists but has never played on ${platformNames[platform]}.`
    } else {
      errorMessage = `${platformNames[platform]} player ${username} not found.`
    }
    return <div className="searchError"><div>{errorMessage}</div></div>
  }

  renderUserData() {
    this.setState({ showUserData: true })
  }

  backToUserForm() {
    this.setState({ showUserData: false })
  }

  render() {
    var data = this.state.data

    var logo = (!this.state.showUserData)
      ? <div className="logo"></div>
      : null

    var playerTrackerSizing = (this.state.showUserData)
      ? "PlayerTracker wide"
      : "PlayerTracker"

    var title = (!this.state.showUserData)
      ? <h1> APEX TRACKER </h1>
      : null

    var userForm = (!this.state.showUserData)
      ? <UserForm
        username={this.state.username}
        platform={this.state.platform}
        getUserData={this.getUserData}
      />
      : null

    var searchResult
    if (data && data.data.global && !this.state.loading) searchResult = <SearchResult
      data={this.state.data}
      renderUserData={this.renderUserData}
    />
    if (this.state.showUserData) searchResult = null

    var userData = (this.state.showUserData)
      ? <UserData
        data={this.state.data}
        back={this.backToUserForm}
      />
      : null


    var error = this.renderError()
    var loader = (this.state.loading)
      ? <div className="loader"><div>...</div></div>
      : null

    return (
      <div className={playerTrackerSizing} >
        {logo}
        {title}
        {userForm}
        {searchResult}
        {error}

        {loader}

        {userData}
      </div>
    )
  }
}

class SearchResult extends React.Component {
  render() {
    var global = this.props.data.data.global

    return (
      <div className="SearchResult" onClick={this.props.renderUserData}>
        <div>
          <h1 className="username" >{global.name}</h1>
          <h2 className="uid">{global.platform}-{global.uid}</h2>
        </div>
      </div>
    )
  }
}


/* TODO: encapsulate FORM
make component for API DATA
*/
export default PlayerTracker