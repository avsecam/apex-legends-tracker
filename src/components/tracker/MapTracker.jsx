import axios from "axios"
import React from "react"
import "./MapTracker.css"


const apiKey = process.env.REACT_APP_API_KEY

class MapTracker extends React.Component {
	constructor(props) {
		super(props)
		this.timer = 0
		this.state = {
			br: null,
			brRanked: null,
			arenas: null,
			arenasRanked: null,

			brTimeLeft: null,
			arenasTimeLeft: null,
			arenasRankedTimeLeft: null,
		}

		this.getMapRotation = this.getMapRotation.bind(this)
	}

	componentDidMount() {
		this.getMapRotation()
		this.handleTimer()
	}

	componentWillUnmount() {
		this.timer = clearInterval()
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
				arenasRanked: data.arenasRanked,

				brTimeLeft: this.timeToSeconds(data.battle_royale.current.remainingTimer),
				arenasTimeLeft: this.timeToSeconds(data.arenas.current.remainingTimer),
				arenasRankedTimeLeft: this.timeToSeconds(data.arenasRanked.current.remainingTimer),
			})
		})
	}

	timeToSeconds(time) {
		let timeSplitted = time.split(':')
		let s = 0
		let m = 1

		while(timeSplitted.length > 0) {
			s += m * parseInt(timeSplitted.pop(), 10)
			m *= 60
		}
		return s
	}

	secondsToTime(time) {
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return hours + ':' + minutes + ':' + seconds;
	}

	handleTimer() {
		this.timer = setInterval(() => {
			this.setState({
				brTimeLeft: --this.state.brTimeLeft,
				arenasTimeLeft: --this.state.arenasTimeLeft,
				arenasRankedTimeLeft: --this.state.arenasTimeLeft,
			}, () => {
				if(this.state.brTimeLeft === 0
				|| this.state.arenasTimeLeft === 0
				|| this.state.arenasRankedTimeLeft === 0) {
					console.log("AAA")
					this.getMapRotation()
				}
			})
		}, 1000)
		
	}

	render() {
		let br = this.state.br
		let brRanked = this.state.brRanked
		let arenas = this.state.arenas
		let arenasRanked = this.state.arenasRanked
		return (
			<div className="MapTracker">
				<div className="mapContainer" style={{backgroundImage: `url(${br?.current.asset})`}}>
					<h2>Battle Royale</h2>
					<h3>{br?.current.map}</h3>
					<h4>{(this.state.brTimeLeft >= 0) ? this.secondsToTime(this.state.brTimeLeft) : ""}</h4>
				</div>
				<div className="mapContainer" style={{backgroundImage: `url(${brRanked?.current.asset})`}}>
					<h2>Battle Royale Ranked</h2>
					<h3>{brRanked?.current.map}</h3>
				</div>
				<div className="mapContainer" style={{backgroundImage: `url(${arenas?.current.asset})`}}>
					<h2>Arenas</h2>
					<h3>{arenas?.current.map}</h3>
					<h4>{(this.state.arenasTimeLeft >= 0) ? this.secondsToTime(this.state.arenasTimeLeft) : ""}</h4>
				</div>
				<div className="mapContainer" style={{backgroundImage: `url(${arenasRanked?.current.asset})`}}>
					<h2>Arenas Ranked</h2>
					<h3>{arenasRanked?.current.map}</h3>
					<h4>{(this.state.arenasRankedTimeLeft >= 0) ? this.secondsToTime(this.state.arenasRankedTimeLeft) : ""}</h4>
				</div>
			</div>
		)
	}
}

export default MapTracker