//import ReactDOM from "react-dom";
/* The delete icon shows only when the task is hovered.
When there is no tasks the list should "No tasks, add a task" */
import React from "react";

export class Todolist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			value: [],
			open: -1
		};
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/eu", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
				for (let x in data) {
					this.setState({ todos: [...this.state.todos, data[x]] });
				}
				/* this.state.todos = data; */
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidUpdate() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/eu", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(this.state.todos)
		});
	}

	addToList = e => {
		if (e.key === "Enter") {
			console.log(this.state.value);
			if (e.target.value.split(" ").join("").length > 0) {
				this.setState({
					todos: [
						...this.state.todos,
						{ label: e.target.value, done: false }
					]
				});
			}
			e.target.value = "";
		}
	};

	deleteFromList = index => {
		this.setState({
			todos: this.state.todos.filter((item, pos) => pos !== index)
		});
	};

	render() {
		return (
			<div>
				<h1>Todos</h1>
				<label>
					<input
						type="text"
						//value={this.state.task}
						//onChange={this.addTask}
						placeholder="Whats need to be done?"
						onKeyPress={this.addToList}
					/>
				</label>

				<div>
					<ul>
						{this.state.todos.map((todo, index) => {
							let stateOfTask = this.state.open === index;
							return (
								<li
									key={index}
									onMouseEnter={() => {
										this.setState({ open: index });
									}}
									onMouseOut={() => {
										this.setState({ open: -1 });
									}}>
									{todo.label}
									<button
										onClick={() =>
											this.deleteFromList(index)
										}
										key={index}
										onMouseEnter={() => {
											this.setState({ open: index });
										}}
										style={{
											display: stateOfTask
												? "inherit"
												: "none"
										}}>
										X
									</button>
								</li>
							);
						})}
					</ul>
					<p className="left">{this.state.todos.length} item left</p>
				</div>
			</div>
		);
	}
}
