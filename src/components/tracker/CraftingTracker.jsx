import axios from "axios"
import React from "react"
import { serverUrl } from "../../constants"
import "./CraftingTracker.css"


class CraftingTracker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
		}

		this.getCraftingRotation = this.getCraftingRotation.bind(this)
	}

	componentDidMount() {
		this.getCraftingRotation()
	}

	getCraftingRotation() {
		axios
			.get(`${serverUrl}/crafting-data`)
			.then(res => {
				this.setState({data: res.data})
				// console.log(this.state.data)
			})
	}

	render() {
		let dailyItems = this.state.data?.[0]
		let weeklyItems = this.state.data?.[1]
		let weapons = [this.state.data?.[2], this.state.data?.[3]]

		let dailyItemsDivs = []
		for(let i = 0; i < 2; i++) {
			dailyItemsDivs.push(
				<div
					key={i}
					className="replicatorItem"
					style={{backgroundImage: `url(${dailyItems?.bundleContent[i].itemType.asset})`}}
				></div>
			)
		}

		let weeklyItemsDivs = []
		for(let i = 0; i < 2; i++) {
			weeklyItemsDivs.push(
				<div
					key={i}
					className="replicatorItem"
					style={{backgroundImage: `url(${weeklyItems?.bundleContent[i].itemType.asset})`}}
				></div>
			)
		}

		let weaponsDivs = []
		for(let i = 0; i < 2; i++) {
			weaponsDivs.push(
				<div
					key={i}
					className="replicatorItem wide"
					style={{backgroundImage: `url(${weapons[i]?.bundleContent[0].itemType.asset})`}}
				></div>
			)
		}

		return (
			<div className="CraftingTracker">
				<div className="craftingScheduleContainer">
					<h2>Daily</h2>
					{dailyItemsDivs}
				</div>
				<div className="craftingScheduleContainer">
					<h2>Weekly</h2>
					{weeklyItemsDivs}
				</div>
				<div className="craftingScheduleContainer">
					<h2>Seasonal</h2>
					{weaponsDivs}
				</div>
			</div>
		)
	}
}

export default CraftingTracker