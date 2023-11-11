import React from "react";
import AddIncome from "./AddIncome";

const AddTransaction = ({ type }: { type: string }) => {
	if (type === "income") {
		return <AddIncome />;
	} else if (type === "expense") {
		return "expense";
	}

	return null;
};

export default AddTransaction;
