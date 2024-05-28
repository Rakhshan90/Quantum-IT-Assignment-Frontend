import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../redux/slices/users/userSlices';
import DateFormatter from '../util/DateFormatter';


const Dashboard = () => {
    const dispatch = useDispatch();

    const usersData = useSelector(store => store?.users);
    const { loading, appErr, serverErr, userList } = usersData;

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch])


    return (
        <div className='min-h-screen mx-auto p-6 md:p-12 dark:bg-slate-800'>
            <div className="flex flex-col space-y-12">
                {/* display error if any */}
                {appErr || serverErr ? (
                    <div className='text-red-500'> {appErr} {serverErr} </div>
                ) : null}
                {/* table for displaying list of users */}
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th className='px-6 py-3'>Name</th>
                            <th className='px-6 py-3'>Email</th>
                            <th className='px-6 py-3'>Date of Birth</th>
                            <th className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.length <= 0 ? (
                            <div className='text-2xl text-red-500'>No users found</div>
                        ) : userList?.map(user => (
                            <tr key={user?._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className='px-6 py-4'>{`${user?.firstName} ${user?.lastName}`}</td>
                                <td className='px-6 py-4'>{user?.email}</td>
                                <td className='px-6 py-4'><DateFormatter date={user?.dob} /></td>
                                <td className='px-6 py-4 space-x-4'>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"
                                            className='fill-blue-400' /></svg>
                                    </button>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" className='fill-red-500' /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard