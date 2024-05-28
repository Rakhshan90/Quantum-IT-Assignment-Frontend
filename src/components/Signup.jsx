import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userRegisterAction } from '../redux/slices/users/userSlices';

// form schema
const formSchema = Yup.object({
    firstName: Yup.string().required('first name is required'),
    lastName: Yup.string().required('last name is required'),
    dob: Yup.string().required('dob is required'),
    email: Yup.string().required('email is required'),
    password: Yup.string().required('password is required'),
});


const Signup = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            // console.log(values);
            dispatch(userRegisterAction(values));
        },
        validationSchema: formSchema,
    })

    // select user registered data from redux store
    const user = useSelector(store => store?.users)
    const { loading, appErr, serverErr, registered } = user;

    // navigate 
    const navigate = useNavigate();
    if (registered) navigate('/login');
    return (
        <div className='min-h-screen bg-teal-600 flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center max-w-lg mx-auto h-full py-6'>
                <form onSubmit={formik.handleSubmit}
                    className='bg-sky-950 p-6 rounded-md mt-14 md:mt-8 md:p-12'>
                    <div className="relative flex flex-col justify-center items-center space-y-8 mb-4">
                        <h1 className="py-4 text-slate-950 text-md text-center w-2/3 bg-teal-300
                    md:text-xl uppercase absolute -top-16">Sign up</h1>
                        {/* display error */}
                        {appErr || serverErr ? (<div className="text-red-500 mb-4">
                            {appErr} {serverErr}
                        </div>) : null}
                        <span className='inline-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="94px" viewBox="0 -960 960 960" width="94px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" className='fill-slate-400' /></svg>
                        </span>
                    </div>
                    {/* first name */}
                    <div className="flex items-center p-2 mb-2 rounded-md w-full bg-slate-600">
                        <span className="inline-block border-r border-slate-400 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                width="24px" ><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" className='fill-slate-400' /></svg>
                        </span>
                        <input
                            type="text"
                            value={formik.values.firstName}
                            onChange={formik.handleChange('firstName')}
                            onBlur={formik.handleBlur('firstName')}
                            className="pl-2 text-white text-md md:text-lg
                            w-full rounded-md outline-none placeholder-slate-400 bg-slate-600
                            transition duration-200"
                            placeholder="First name"
                        />
                    </div>
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.firstName}
                        </div>
                    )}
                    {/* last name */}
                    <div className="flex items-center p-2 mb-2 rounded-md w-full bg-slate-600">
                        <span className="inline-block border-r border-slate-400 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                width="24px" ><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" className='fill-slate-400' /></svg>
                        </span>
                        <input
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange('lastName')}
                            onBlur={formik.handleBlur('lastName')}
                            className="pl-2 text-white text-md md:text-lg
                            w-full rounded-md outline-none placeholder-slate-400 bg-slate-600
                            transition duration-200"
                            placeholder="Last name"
                        />
                    </div>
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.lastName}
                        </div>
                    )}
                    {/* date of birth */}
                    <div className="flex items-center p-2 mb-2 rounded-md w-full bg-slate-600">
                        <span className="inline-block border-r border-slate-400 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                width="24px" ><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" className='fill-slate-400' /></svg>
                        </span>
                        <input
                            type="date"
                            value={formik.values.dob}
                            onChange={formik.handleChange('dob')}
                            onBlur={formik.handleBlur('dob')}
                            className="pl-2 text-slate-400 text-md md:text-lg
                            w-full rounded-md outline-none placeholder-slate-400 bg-slate-600
                            transition duration-200"
                            placeholder="First name"
                        />
                    </div>
                    {formik.touched.dob && formik.errors.dob && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.dob}
                        </div>
                    )}
                    {/* email */}
                    <div className="flex items-center p-2 mb-2 rounded-md w-full bg-slate-600">
                        <span className="inline-block border-r border-slate-400 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                width="24px" ><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" className='fill-slate-400' /></svg>
                        </span>
                        <input
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            className="pl-2 text-white text-md md:text-lg
                            w-full rounded-md outline-none placeholder-slate-400 bg-slate-600
                            transition duration-200"
                            placeholder="Email address"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.email}
                        </div>
                    )}
                    {/* password */}
                    <div className="flex items-center p-2 mb-2 rounded-md w-full bg-slate-600">
                        <span className="inline-block border-r border-slate-400 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                width="24px" ><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" className='fill-slate-400' /></svg>
                        </span>
                        <input
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            className="pl-2 text-white text-md md:text-lg
                            w-full rounded-md outline-none placeholder-slate-400 bg-slate-600
                            transition duration-200"
                            placeholder="Password"
                        />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500 mb-4 mt-1">
                            {formik.errors.password}
                        </div>
                    )}
                    {/* forgot password and remember me container */}
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <input type="checkbox"
                                className='mr-2 checked:bg-slate-950 checked:border border-teal-600' />
                            <span className='text-teal-600'>Remember me</span>
                        </div>
                        <span className='text-teal-600'>Forgot Password</span>
                    </div>
                    {/* Sign up button */}
                    {loading ? (
                        <button disabled className='py-2 px-36 rounded-md text-slate-950 text-md text-center  bg-slate-400 opacity-50
                        md:text-xl uppercase'>Loading</button>
                    ) : (
                        <button className='py-2 px-36 rounded-md text-slate-950 text-md text-center  bg-teal-300
                    md:text-xl uppercase'>Sign up</button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Signup