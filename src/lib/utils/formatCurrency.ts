const formatCurrency = (amount: number, currencyCode = "USD") => {
	try {
		const formattedAmount = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currencyCode
		}).format(amount);

		return formattedAmount;
	} catch (error) {
		console.error("Error formatting currency:", error);
		return null;
	}
};

export default formatCurrency;
