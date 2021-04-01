import Link from 'next/link';
import { firebaseAdmin } from 'gateway/serverApp';
import styles from 'styles/Chores.module.css';
import { withAuthServerSideProps } from 'hoc/withAuthServerSideProps';
import  { withAuthedUser } from 'hoc/withAuthedUser';
import { InferGetServerSidePropsType } from 'next';
import {
  Heading,
  List,
  ListItem,
  Flex,
  Button,
} from '@chakra-ui/react';

type Chore = {
  id: string;
  type: string;
};

export const getServerSideProps = withAuthServerSideProps<Chore[]>('chores')(
  async ({ token, context }) => {
    const db = firebaseAdmin.firestore();
    const choresRef = db.collection('/users/1KRzPDi1gJ1sLcJUuwHN/chores');
    const data = await choresRef.get();
    const chores: Chore[] = [];
    data.forEach((chore) => {
      chores.push({ id: chore.id, type: chore.data().type });
    });
    return chores;
  }
);

const ChoresPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <>
      <Flex justify='space-between'>
        <Heading> My chores </Heading>
        <Button colorScheme='teal'>Add chore</Button>
      </Flex>
      <List>
        {props.chores.map((chore) => (
          <ListItem key={chore.id}>
            <Link href={`/chores/${chore.id}`}>
              <a className={styles.single}> {chore.type} </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChoresPage;
