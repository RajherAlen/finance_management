import { apiSlice } from "src/store/apiSlice";

const backendURL = "http://localhost:3000";

export interface LoginUserProps {
	username: string;
	password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${backendURL}/api/auth/login`,
				method: "POST",
				body: data
			})
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${backendURL}/api/auth/register`,
				method: "POST",
				body: data
			})
		})
	})
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
