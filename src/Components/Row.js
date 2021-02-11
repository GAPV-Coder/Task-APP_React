import React from "react";

export const Row = (props) => (
	<tr key={props.task.name}>
		<td>{props.task.name}</td>
		<td>
			<input
				type="checkbox"
				checked={props.task.done}
				onChange={() => props.handleTask(props.task)}
			/>
		</td>
	</tr>
);
