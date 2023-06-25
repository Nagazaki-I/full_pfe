import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { SyncLoader } from "react-spinners";
import { setUserInfo } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { logo_2 } from "../assets/assets";
import axios from "axios";




const Login = () => {
	{
		/*################################ Schema Of The React Form #################################### */
	}


	const formSchema = yup.object().shape({
		email: yup.string().required("Enter your email!"),
		password: yup
			.string()
			.required("Enter your password!")
			.min(6, "Password must be at 6 characters long"),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(formSchema) });

	{
		/*###################################### Athentication ########################################## */
	}
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = getAuth();

	const [authError, setAuthError] = useState();
	const [loading, setLoading] = useState(false);

	const postUserToSession = async (userObject) => {
		try {
			const response = await axios.post("/api/login", JSON.stringify(userObject), {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				// credentials: 'same-origin' (This is the same as setting the `cookie_samesite: lax` in the backend)
				}
			);
			const user = response.data
			// console.log(user);
			localStorage.setItem('user', JSON.stringify(user))

			dispatch(
				setUserInfo(JSON.parse(localStorage.getItem("user")))
			);
			
		} catch (error) {
			console.error(error);
		}
	};

	const loginHandler = (data) => {
		setLoading(true);
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				const user = userCredential.user;
				postUserToSession(user);
				// console.log(user);
				// dispatch(
				// 	setUserInfo({
				// 		_id: user.uid,
				// 		username: user.displayName,
				// 		email: user.email,
				// 		avatar: user.photoURL,
				// 	})
				// );

				// ------------Redirect --------
				setTimeout(() => {
					navigate("/");
				}, 1500);
			})
			.catch((error) => {
				setLoading(false);
				reset({
					email: null,
					password: null,
				});
				setAuthError(error.code);
			});
	};

	{
		/* ---------------------------------------------------------------------- */
	}

	const provider = new GoogleAuthProvider();

	const handleGoogleAuth = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				postUserToSession(user)
				// ...
				// dispatch(
				// 	setUserInfo({
				// 		_id: user.uid,
				// 		username: user.displayName,
				// 		email: user.email,
				// 		avatar: user.photoURL,
				// 	})
				// );
				// ------------Redirect --------
				navigate("/");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};

	{
		/*############################################################################################### */
	}

	document.body.style = "background: rgb(243 244 246)";
	return (
		
		<div className="flex flex-col items-center pt-4 bg-gray-100">
			<div>
				<Link to="/">
					{/* <h3 className="text-4xl font-bold text-yellow-400">----</h3> */}
					<img className="w-24 mt-2" src={logo_2} />
				</Link>
			</div>
			<div className="w-full px-6 pt-0 pb-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-xl">
				<form onSubmit={handleSubmit((data) => loginHandler(data))}>
					{/* Email */}
					<div className="mt-4">
						<label
							htmlFor="email"
							className="text-sm font-medium text-gray-700 undefined"
						>
							Email
						</label>
						<div className="flex flex-col items-start">
							<input
								type="text"
								className="w-full py-1 px-2 rounded-md shadow-sm border-[1px] focus:outline-none focus:border-yellow-400"
								{...register("email")}
								onChange={(e) => e.preventDefault()}
							/>
							{errors.email ? (
								<p className="text-red-500 text-sm font-base">
									{errors.email.message}
								</p>
							) : null}
							{authError === "auth/user-not-found" ? (
								<p className="text-red-500 text-sm font-base">Invalid email!</p>
							) : null}
						</div>
					</div>
					{/* Password */}
					<div className="mt-4">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700 undefined"
						>
							Password
						</label>
						<div className="flex flex-col items-start">
							<input
								type="password"
								name="password"
								className="w-full py-1 px-2 rounded-md shadow-sm border-[1px] focus:outline-none focus:border-yellow-400"
								{...register("password")}
								onChange={(e) => e.preventDefault()}
							/>
							{errors.password ? (
								<p className="text-red-500 text-sm font-base">
									{errors.password.message}
								</p>
							) : null}
							{authError === "auth/wrong-password" && !errors.password ? (
								<p className="text-red-500 text-sm font-base">
									Wrong password!
								</p>
							) : null}
						</div>
					</div>
					{/* Pass Reset */}
					<Link to="#" className="text-sm text-blue-600 hover:underline">
						Forgot Password?
					</Link>
					{/* Login */}
					<div className="flex items-center mt-4">
						<button className="w-full px-4 py-2 text-black transition-colors duration-200 rounded-md bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:bg-yellow-600">
							{loading ? (
								<SyncLoader size={4} color="black" margin={5} />
							) : (
								"Login"
							)}
						</button>
					</div>
				</form>
				{/* Login with Google */}
				<div className="my-4">
					<button
						className="w-full flex items-center justify-center p-2 gap-4 border rounded-md border-gray-400 active:bg-gray-800 active:text-white active:duration-200"
						onClick={handleGoogleAuth}
					>
						{" "}
						{/*For the dark mode use dark:border-gray-400 */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							className="w-5 h-5 fill-current"
						>
							<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
						</svg>
						<p>Login with Google</p>
					</button>
				</div>
				<div className="w-full flex items-center mt-8">
					<hr className="w-4/5 sml:w-full border-black" />
					<p className="w-full px-0 flex justify-center text-sm">
						New customer?
					</p>
					<hr className="w-4/5 sml:w-full border-black" />
				</div>
				<div className="w-full my-3">
					<Link to="/register">
						<button className="w-full flex items-center justify-center p-2 gap-4 border rounded-md border-gray-400 active:bg-gray-800 active:text-white active:duration-200  ">
							<p>Create an account</p>
						</button>{" "}
						{/*To use the dark mode use dark:border-gray-400 */}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
