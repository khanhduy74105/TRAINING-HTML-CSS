'use client'

import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth: React.FC = (props) => {
    const router = useRouter();
    const {user} = useContext(AuthContext)
    useEffect(() => {
      if (user) {
        router.push('/');
      }
    }, [router,user]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;