import { useAuth } from 'context/AuthProvider';
import { useEffect } from 'react';
import Router from 'next/router';

export const withAuthedUser = <P extends {}>(
  Component: React.ComponentType<P>
) => (props) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, []);

  return <Component {...props} />;
};
