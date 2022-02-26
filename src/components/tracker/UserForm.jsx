import React from "react"
import "./UserForm.css"

class UserForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: props.username,
			platform: props.platform,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		if(e.target.name === "username") this.setState({username: e.target.value})
		else this.setState({platform: e.target.id})
	}

	handleSubmit(e) {
		e.preventDefault()
		let username = this.state.username
		let platform = this.state.platform
		if(username === "" || platform === "") return
		this.props.getUserData(username, platform)
	}

	render() {
		const platforms = ["PC", "PS4", "X1"]
		const platformChoices = platforms.map((platform, idx) => {
			return <div key={idx}>
				<input type="radio" id={platform} name="platform" onChange={this.handleChange} defaultChecked={(this.state.platform === platform)}/>
				<label htmlFor={platform}>{platform}</label>
			</div>
		})

		return (
			<form className="UserForm" onSubmit={this.handleSubmit}>
				<label className="username">
					USERNAME
					<input type="text" className="skewed" name="username" defaultValue={this.state.username} onChange={this.handleChange} />
				</label>
				<div className="platformDiv">
					PLATFORM
					<div className="platforms">
						{platformChoices}
					</div>
				</div>
				<input type="submit" className="skewed" name="submit" value="SEARCH"/>
			</form>
		)
	}
}

export default UserForm