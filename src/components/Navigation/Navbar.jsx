import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogoutAction } from '../../redux/slices/users/userSlices';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.users);
  const { userAuth } = user;
  return (
    <div className='bg-sky-950 flex space-x-4 p-2 md:p-4'>
      {/* <Link to='/' className='text-teal-400 text-md md:text-xl font-bold' >Dashboard</Link> */}
      {userAuth ? (
        <button
          onClick={() => dispatch(userLogoutAction())}
          className='text-red-500 text-md md:text-xl font-bold'>Logout</button>
      ) : (
        <Link to='/login' className='text-teal-400 text-md md:text-xl font-bold'>Login</Link>
      )}
      {!userAuth ? (
        <Link to='/signup' className='text-teal-400 text-md md:text-xl font-bold'>Signup</Link>
      ) : null}
    </div>
  )
}

export default Navbar