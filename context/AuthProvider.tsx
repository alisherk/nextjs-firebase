import { firebase } from 'gateway/clientApp';
import nookies from 'nookies';
import { User } from 'gateway/types';
import {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';

interface ProviderState {
  user: User;
}

export const AuthContext = createContext<ProviderState | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }
    const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', {});
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      setUser(user);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, {});
    });
    // Unsubscribe auth listener on unmount
    return () => unsubscribe();
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 1 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser can only be used inside UserContextProvider');
  }
  return context;
};
