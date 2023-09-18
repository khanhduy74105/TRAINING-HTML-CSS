'use client'

import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth: React.FC = (props) => {
    const router = useRouter();
    const {setUser} = useContext(AuthContext)
    const [isLoading, setIsLoaing] = useState<boolean>(true)
    useEffect(() => {
      const user = localStorage.getItem('user')
      if (user) {
        setUser(user)
        router.push('/');
      }else{
        setIsLoaing(false)
      }
    }, [router, setUser]);

    return isLoading ? <div>loading...</div> : <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;