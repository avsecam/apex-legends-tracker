import React from "react"
import "./App.css"
import MapTracker from "./components/tracker/MapTracker"
import PlayerTracker from "./components/tracker/PlayerTracker"
import CraftingTracker from "./components/tracker/CraftingTracker"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeScreen: "Tracker",
    }
  }

  componentDidMount() {
    // Stops animation on resize
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
        <MapTracker />
        <PlayerTracker />
        <CraftingTracker />
      </div>
    )
  }
}

export default App