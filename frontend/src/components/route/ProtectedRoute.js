import React, {  useEffect } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { loadUser } from '../../actions/userActions'
import Loader from '../layout/Loader'

const ProtectedRoute = ({ children,isAdmin}) => {
    const { isAuthenticated=false, loading=true, user } = useSelector(state => state.auth)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(loadUser)
    },[isAuthenticated,loading])

    if(loading===true) return <Loader/>

    if(!loading && isAuthenticated)
    {
        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to="/" />
        }
        return children;
    }
    else{
        return <Navigate to='/login' />
    }
    
}

export default ProtectedRoute