import React from "react"
import "./App.css"
import PlayerTracker from "./components/tracker/PlayerTracker"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeScreen: "Tracker",
    }
  }

  render() {
    return (
      <div className="App" >
        <PlayerTracker />
      </div>
    )
  }
}

export default App