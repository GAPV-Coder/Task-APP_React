import React, { useState, useEffect } from "react";
import { Banner } from "./Components/Banner";
import { Row } from "./Components/Row";
import { Creator } from "./Components/Creator";
import { ControlWiev } from "./Components/ControlWiev";

function App() {
	const [userName, setUserName] = useState("Gustavo");
	const [taskItems, setTaskItems] = useState([
		{ name: "Task One", done: false },
		{ name: "Task Two", done: false },
		{ name: "Task Three", done: false },
		{ name: "Task Four", done: false },
	]);

	const createNewTask = (taskName) => {
		if (!taskItems.find((t) => t.name === taskName)) {
			setTaskItems([...taskItems, { name: taskName, done: false }]);
		}
	};

	const handleTask = (task) =>
		setTaskItems(
			taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
		);

	const taskRows = (doneValue) =>
		taskItems
			.filter((task) => task.done === doneValue)
			.map((task) => (
				<Row key={task.name} task={task} handleTask={handleTask} />
			));

	const [displayCompleted, setDisplayCompleted] = useState(true);

	useEffect(() => {
		let data = localStorage.getItem("tasks");
		if (data != null) {
			setTaskItems(JSON.parse(data));
		} else {
			setUserName("Gustavo");
			setTaskItems([
				{ name: "Task One", done: false },
				{ name: "Task Two", done: false },
				{ name: "Task Three", done: false },
				{ name: "Task Four", done: false },
			]);
			setDisplayCompleted(true);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(taskItems));
	}, [taskItems]);

	return (
		<div className="App">
			<Banner userName={userName} taskItems={taskItems} />
			<div className="container-fluid">
				<Creator callback={createNewTask} />
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Description</th>
							<th>Done</th>
						</tr>
					</thead>
					<tbody>{taskRows(false)}</tbody>
				</table>
				<div className="bg-secondary text-white text-center p-2">
					<ControlWiev
						description="Completed Tasks"
						isChecked={displayCompleted}
						callback={(checked) => setDisplayCompleted(checked)}
					/>
				</div>
				{displayCompleted && (
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>Description</th>
								<th>Done</th>
							</tr>
						</thead>
						<tbody>{taskRows(true)}</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

export default App;
