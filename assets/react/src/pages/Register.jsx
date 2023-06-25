import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ProfileIcon, logo_2 } from '../assets/assets';
import { SyncLoader } from "react-spinners"





const Register = () => {
  {/*################################ Schema Of The React Form #################################### */ }

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required!").matches(/^[A-Za-z]+$/, "Name can only contain letters!"),
    email: yup.string().required("Email is required!").email("Invalid email address!").matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, "Invalid email address!"),
    password: yup.string().required("Password is required!").min(6, 'Password must be at 6 characters long'),
    passwordConfirm: yup.string().required("Confirm your password!").oneOf([yup.ref("password")], "Passwords do not match!")
  })

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({ resolver: yupResolver(formSchema) })

  {/*###################################### Registration ########################################## */ }

  const navigate = useNavigate()
  const auth = getAuth()
  // This state can also be used the handle the email verification (Without using the regex in the schema)
  const [authError, setAuthError] = useState()
  const [loading, setLoading] = useState(false)
  // console.log(authError);

  const onSubmitHandler = (data) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // update the profile name and avatar because they are set to `null` by default when the account is created:
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: "/images/profileIcon.png"
        });
        // const user = userCredential.user;

        // ---------------------------
        setTimeout(() => {
          navigate("/login")
        }, 1500)
      })
      .catch((error) => {
        setLoading(false);
        setAuthError(error.code)
      });
  }


 

  {/*############################################################################################### */ }

  document.body.style = "background: rgb(243 244 246)"
  return (
    <div>
      <div className="flex flex-col items-center pt-4 bg-gray-100">
        <div>
          <Link to="/">
            {/* <h3 className="text-4xl font-bold text-yellow-400">----</h3> */}
            <img className='w-24 mt-2' src={logo_2} />
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-xl">
          <form onSubmit={handleSubmit(data => onSubmitHandler(data))}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 undefined">Name</label>
              <div className="flex flex-col items-start">
                <input type="text" className="w-full py-1 px-2 rounded-md shadow-sm border-[1px] focus:outline-none focus:border-yellow-400" {...register("name")} onChange={(e) => e.preventDefault()} />
                {/* <p className='text-red-500 text-sm font-base'>{errors.name?.message}</p> */}
                {errors.name ? <p className='text-red-500 text-sm font-base'>{errors.name.message}</p> : null}
              </div>
            </div>
            {/* Email */}
            <div className="mt-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 undefined">Email</label>
              <div className="flex flex-col items-start">
                <input type="text" className="w-full py-1 px-2 rounded-md shadow-sm border-[1px] focus:outline-none focus:border-yellow-400" {...register("email")} onChange={(e) => e.preventDefault()} />
                {errors.email ? <p className='text-red-500 text-sm font-base'>{errors.email.message}</p> : null}
                {authError === "auth/email-already-in-use" && !errors.email ? <p className='text-red-500 text-sm font-base'>Email already in use. Try a different one</p> : null}
              </div>
            </div>
            {/* Password */}
            <div className="mt-4">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 undefined">Password</label>
              <div className="flex flex-col items-start">
                <input type="password" className="w-full py-1 px-2 rounded-md shadow-sm border-[1px] focus:outline-none focus:border-yellow-400" {...register("password")} onChange={(e) => e.preventDefault()} />
                {errors.password ? <p className='text-red-500 text-sm font-base'>{errors.password.message}</p> : null}
              </div>
            </div>
            {/* Password Confirmation */}
            <div className="mt-4">
              <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 undefined">Confirm Password</label>
              <div className="flex flex-col items-start">
                <input type="password" className="w-full py-1 px-2 rounded-md shadow-sm border-[1px] focus:outline-none focus:border-yellow-400" {...register("passwordConfirm")} onChange={(e) => e.preventDefault()} />
                {/* {errors.passwordConfirm?.message} */}
                {
                  errors.passwordConfirm ? (
                    getValues("password") && !getValues("passwordConfirm") ? (
                      <p className='text-red-500 text-sm font-base'>Confirm your password</p>
                    ) : getValues("passwordConfirm") !== getValues("password") ? (
                      <p className='text-red-500 text-sm font-base'>Passwords do not match</p>
                    ) : (
                      <p className='text-red-500 text-sm font-base'>{errors.passwordConfirm?.message}</p>
                    )
                  )
                    : null
                }
              </div>
            </div>
            {/* Register */}
            <div className="flex items-center mt-6">
              <button className="w-full px-4 py-2 text-black transition-colors duration-200 rounded-md bg-yellow-400 hover:bg-yellow-500 active:outline-none active:bg-yellow-600">{loading ? <SyncLoader size={4} color="black" margin={5} /> : "Sign up"}</button>
            </div>
          </form>

          {/* Register with Google + Github */}
          {/* <div className="my-4"> */}
            {/* <button className="w-full flex items-center justify-center p-2 gap-4 border rounded-md border-gray-400 active:bg-gray-800 active:text-white active:duration-200"> For the dark mode use dark:border-gray-400 */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"> */}
                {/* <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path> */}
              {/* </svg> */}
              {/* <p>Sign up with Google</p> */}
            {/* </button> */}
          {/* </div> */}

          {/* Login */}
          <div className="w-full flex items-center mt-8">
            <hr className="w-1/4 sml:w-3/5 border-black" />
            <p className="w-full px-3 flex justify-center text-sm">Already have an account?</p>
            <hr className="w-1/4 sml:w-3/5 border-black" />
          </div>
          <div className="w-full my-3">
            <Link to="/login">
              <button className="w-full flex items-center justify-center p-2 gap-4 border rounded-md border-gray-400 active:bg-gray-800 active:text-white active:duration-200  ">
                  <p>Login</p>
              </button> {/*For the dark mode use dark:border-gray-400 */}
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   registration page
    // </div>
  )
}

export default Register