import React from "react"
import "./UserData.css"
import legendIcons from "./legendIcons.jsx"


// import avsecam from "./avsecam.json"


class UserData extends React.Component {

	hasRankDivision(rankedGamemode) {
		const ranksWithoutDivisions = ["unranked", "master", "apex predator"]
		var rankName = (rankedGamemode === "rank") ? this.props.data.data.global.rank.rankName : this.props.data.data.global.arena.rankName
		for(let i = 0; i < ranksWithoutDivisions.length; i++) {
			if(rankName.toLowerCase() === ranksWithoutDivisions[i]) {
				return false
			}
		}
		return true
	}

	isApexPredator(rankedGamemode) {
		var rankName = (rankedGamemode === "rank") ? this.props.data.data.global.rank.rankName : this.props.data.data.global.arena.rankName
		if(rankName.toLowerCase() === "apex predator") return true
		else return false
	}

	render() {
		var data = this.props.data

		// var data = avsecam

		var global = data.data.global
		var realtime = data.data.realtime
		var legends = data.data.legends

		var isOnline = realtime.isOnline
		var isInGame = (isOnline) ? realtime.isInGame : 0

		return (
			<div className="UserData">
				<button className="backButton" onClick={this.props.back}>&#8249;<span>BACK</span></button>
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
							<h2>LEVEL</h2>
							<div className="progressLevel">{global.level}</div>
							<div className="progressToNext">{global.toNextLevelPercent}% to Level {global.level + 1}</div>
							<div className="progressBar"><div style={{width: global.toNextLevelPercent + "%"}}></div></div>
						</div>
						<div className="divider"></div>
						<div className="progressCard">
							<h2>BATTLE ROYALE RANKED</h2>
							<div className="progressLevel" style={{color: `var(--${global.rank.rankName.split(" ")[0].toLowerCase()})`}}>
								{this.isApexPredator("rank") ? "predator" : global.rank.rankName} {this.hasRankDivision("rank") ? global.rank.rankDiv : ""}
							</div>
							<div className="rankPoints">{global.rank.rankScore} AP</div>
						</div>
						<div className="divider"></div>
						<div className="progressCard">
							<h2>ARENAS RANKED</h2>
							<div className="progressLevel" style={{color: "var(--" + global.arena.rankName.split(" ")[0].toLowerCase() + ")"}}>
								{this.isApexPredator("arena") ? "predator" : global.arena.rankName} {this.hasRankDivision("arena") ? global.arena.rankDiv : ""}
							</div>
							<div className="rankPoints">{global.arena.rankScore} AP</div>
						</div>
					</div>
					<div className="activeLegend">
						<h2>ACTIVE LEGEND</h2>
						<div className="legendName">{legends.selected.LegendName}</div>
						<div className="legendIcon"><img src={legendIcons[legends.selected.LegendName]} alt={`${legends.selected.LegendName} icon`}></img></div>
					</div>
				</main>
			</div>
		)
	}
}
export default UserData