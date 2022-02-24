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
		return (
			<form className="UserForm" onSubmit={this.handleSubmit}>
				<label className="username">
					USERNAME
					<input type="text" className="skewed" name="username" defaultValue={this.state.username} onChange={this.handleChange} />
				</label>
				<div className="platformDiv">
					PLATFORM
					<div className="platforms">
						<div>
							<input type="radio" id="PC" name="platform" onChange={this.handleChange} />
							<label htmlFor="PC">PC</label>
						</div>
						<div>
							<input type="radio" id="PS4" name="platform" onChange={this.handleChange} />
							<label htmlFor="PS4">PS4</label>
						</div>
						<div>
							<input type="radio" id="X1" name="platform" onChange={this.handleChange} />
							<label htmlFor="X1">X1</label>
						</div>
					</div>
				</div>
				<input type="submit" className="skewed" name="submit" value="SEE STATS"/>
			</form>
		)
	}
}

export default UserForm