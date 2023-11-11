import React from "react";
import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";

const AddTransaction = ({ type }: { type: string }) => {
	if (type === "income") {
		return <AddIncome />;
	} else if (type === "expense") {
		return <AddExpense />;
	}

	return null;
};

export default AddTransaction;
