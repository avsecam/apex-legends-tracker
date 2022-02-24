import React from "react"
import "./UserData.css"
import avsecam from "./avsecam.json"

class UserData extends React.Component {
	render() {
		// var data = this.props.data.data

		var data = avsecam
		var global = data.data.global
		var realtime = data.data.realtime

		var isOnline = realtime.isOnline
		var isInGame = realtime.isInGame

		return (
			<div className="UserData">
				<button className="backButton" onClick={this.props.back}>BACK</button>
				<header>
					<h1 className="username">{global.name}</h1>
					<h2 className="uid">{global.platform}-{global.uid}</h2>
					<div className={`status ${(isOnline) ? "online" : "offline"}`}>
						{(isOnline) ? "ONLINE" : "OFFLINE"}
						{(isInGame) ? ", IN-GAME" : ""}
					</div>
				</header>
				<div className="divider"></div>
				<main>
					<div className="progressDiv">
						<div className="progressCard">
							<div className="progressTitle">Level</div>
							<div className="progressLevel">{global.level}</div>
							<div className="progressBar"></div>
							<div className="progressToNext">{global.toNextLevelPercent}% to Level {global.level + 1}</div>
						</div>

						<div className="progressCard">
							<div className="progressTitle">Level</div>
							<div className="progressLevel">{global.level}</div>
							<div className="progressBar"></div>
							<div className="progressToNext">{global.toNextLevelPercent}% to Level {global.level + 1}</div>
						</div><div className="progressCard">
							<div className="progressTitle">Level</div>
							<div className="progressLevel">{global.level}</div>
							<div className="progressBar"></div>
							<div className="progressToNext">{global.toNextLevelPercent}% to Level {global.level + 1}</div>
						</div>
					</div>
					<div className="activeLegend">WATTSON</div>
				</main>
			</div>
		)
	}
}


// progress bar
export default UserData