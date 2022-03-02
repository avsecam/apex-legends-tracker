import axios from "axios"
import React from "react"
import "./CraftingTracker.css"


const apiKey = process.env.REACT_APP_API_KEY

class CraftingTracker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
		}
	}

	componentDidMount() {
		this.getCraftingRotation()
	}

	getCraftingRotation() {
		axios
			.get(`https://api.mozambiquehe.re/crafting?&auth=${apiKey}`)
			.then(res => this.setState({data: res}))
	}

	render() {
		return (
			<div className="CraftingTracker">
				<div className="craftingScheduleContainer">
					<h2>Monthly</h2>
					<img src="" alt="" />
					<img src="" alt="" />
				</div>
				<div className="craftingScheduleContainer">
					<h2>Weekly</h2>
					<img src="" alt="" />
					<img src="" alt="" />
				</div>
				<div className="craftingScheduleContainer">
					<h2>Permanent</h2>
					<img src="" alt="" />
					<img src="" alt="" />
				</div>
			</div>
		)
	}
}

export default CraftingTracker