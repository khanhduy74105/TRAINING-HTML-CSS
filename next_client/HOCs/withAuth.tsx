'use client'

import { setUser } from '@/redux/actions';
import { useRouter } from 'next/navigation'
import React, {useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth: React.FC = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoaing] = useState<boolean>(true)
    const dispatch = useDispatch()
    useEffect(() => {
      const user = localStorage.getItem('user')
      if (user) {
        dispatch(setUser(JSON.parse(user)))
        router.push('/');
      }else{
        setIsLoaing(false)
      }
    }, []);

    return isLoading ? <div>loading...</div> : <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;