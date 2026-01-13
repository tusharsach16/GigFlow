import {Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { getMe } from '../store/slices/authSlice';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BrowseGigs from '../pages/BrowseGigs';
import GigDetails from '../pages/GigDetails';
import CreateGig from '../pages/CreateGig';
import MyGigs from '../pages/MyGigs';
import MyBids from '../pages/MyBids';
import Dashboard from '../pages/Dashboard';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';

const AppRoutes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path='login' element={<Login/>} />
                <Route path='register' element={<Register/>} />
                <Route path='browse' element={<BrowseGigs/>} />
                <Route path='gigs/:id' element={<GigDetails/>} />
                <Route path='privacy' element={<PrivacyPolicy/>}/>
                <Route path='terms' element={<TermsOfService/>} />

                <Route path='create-gig' 
                    element={
                        <ProtectedRoute>
                            <CreateGig/>
                        </ProtectedRoute>
                    }
                />

                <Route path='dashboard'
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />

                <Route path='my-gigs'
                    element = {
                        <ProtectedRoute>
                            <MyGigs/>
                        </ProtectedRoute>
                    }
                />

                <Route path='my-bids'
                    element = {
                        <ProtectedRoute>
                            <MyBids/>
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;