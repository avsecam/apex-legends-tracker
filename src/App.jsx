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

  componentDidMount() {
    // STOP ANIMATING ON RESIZE
    let noAnimsTimer;
    window.addEventListener("resize", () => {
      document.body.classList.add("animation-stopper")
      clearTimeout(noAnimsTimer)
      noAnimsTimer = setTimeout(() => {
        document.body.classList.remove("animation-stopper")
      }, 400)
    })
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