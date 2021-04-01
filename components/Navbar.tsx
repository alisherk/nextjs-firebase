import { Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { firebase } from 'gateway/clientApp';
import { useAuth } from 'context/AuthProvider';
import Image from 'next/image'; 
import Router from 'next/router';

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async (): Promise<void> => {
    Router.push('/')
    await firebase.auth().signOut();
  };

  return (
    <nav>
      <div className='logo'>
        <Image src='/vercel.svg' width={128} height={77} />
      </div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/chores'>
        <a>Jobs</a>
      </Link>
      {user ? (
        <ChakraLink onClick={handleLogout}> Logout </ChakraLink>
      ) : (
        <Link href='/login'>
          <a>Login</a>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
