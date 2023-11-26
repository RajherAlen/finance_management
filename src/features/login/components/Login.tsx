import React from "react";
import LoginInfoCard from "./LoginInfoCard";
import LoginForm from "./LoginForm";

const Login = () => {
	return (
		<div className="flex gap-12 h-full">
			<LoginForm />
			<LoginInfoCard />
		</div>
	);
};

export default Login;
