import axios from "axios"
import React from "react"
import "./MapTracker.css"


const apiKey = process.env.REACT_APP_API_KEY

class MapTracker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			br: null,
			brRanked: null,
			arenas: null,
			arenasRanked: null,
		}

		this.getMapRotation = this.getMapRotation.bind(this)
	}

	getMapRotation() {
		axios
			.get(`https://api.mozambiquehe.re/maprotation?version=2&auth=${apiKey}`)
			.then(res => {
				console.log("MAP", res)
				let data = res.data
				this.setState({
					br: data.battle_royale,
					brRanked: data.ranked,
					arenas: data.arenas,
					arenasRanked: data.arenasRanked
				})
			})
	}

	renderMaps() {
		
	}

	render() {
		this.getMapRotation()
		return (
			<div className="MapTracker">
				<div className="mapContainer">
					<img src="" alt="" className="mapImg" />
					<h2>Battle Royale</h2>
					<h3>World's Edge</h3>
					<h4>time:left</h4>
				</div>
				<div className="mapContainer">
					<img src="" alt="" className="mapImg" />
					<h2>Battle Royale Ranked</h2>
					<h3>Rust</h3>
					<h4>time:left</h4>
				</div>
				<div className="mapContainer">
					<img src="" alt="" className="mapImg" />
					<h2>Arenas</h2>
					<h3>Oasis</h3>
					<h4>time:left</h4>
				</div>
				<div className="mapContainer">
					<img src="" alt="" className="mapImg" />
					<h2>Arenas Ranked</h2>
					<h3>Overflow</h3>
					<h4>time:left</h4>
				</div>
			</div>
		)
	}
}

export default MapTracker