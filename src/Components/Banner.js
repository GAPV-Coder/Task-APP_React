import React from "react";

export const Banner = (props) => (
	<h4 className="bg-success text-white text-center p-4">
		{props.userName}'s Tasks App (
		{props.taskItems.filter((t) => !t.done).length} tasks to do)
	</h4>
);
