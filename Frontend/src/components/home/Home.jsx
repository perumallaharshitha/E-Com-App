import React, { useEffect, useState } from 'react';
import './Home.css';
import { userLoginContext } from '../../contexts/UserLoginContext';
import { useContext } from 'react';
import Products from '../products/Products';

function Home() {
    const { userLoginStatus,currentUser } = useContext(userLoginContext);
    return (
        <div className='mt-5'>
            {
                userLoginStatus && 
                <div className="text-center">
                    <h3 className="m-4">Hello!  {currentUser.username}</h3>
                </div>
            }
            {
                !userLoginStatus && 
                <div className="text-center">
                    <h3 className="m-4 mb-1">Hello!</h3>
                    <h4 className="m-4 ms-0 me-0">Login to Purchase Items</h4>
                </div>
            }
            <Products/>
        </div>
    );
}

export default Home;