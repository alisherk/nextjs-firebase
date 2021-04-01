import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/Home.module.css';
import { useAuth } from 'context/AuthProvider';
import { Text, Heading } from '@chakra-ui/react';


export default function Home() {
    
  const { user } = useAuth();
  return (
    <div>
      <Head>
        <title>Alisher's chores</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Heading my='10px' align='center'>
        Homepage
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi
        impedit suscipit architecto, odio inventore nostrum non neque dicta.
        Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem
        nobis odit.
      </Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi
        impedit suscipit architecto, odio inventore nostrum non neque dicta.
        Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem
        nobis odit.
      </Text>
      {user ? (
        <Link href='/chores'>
          <a className={styles.btn}>See my chores</a>
        </Link>
      ) : (
        <Link href='/login'>
        <a className={styles.btn}>Login</a>
      </Link>
      )}
    </div>
  );
}
