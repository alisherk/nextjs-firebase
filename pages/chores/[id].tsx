import { firebase } from 'gateway/clientApp';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const ref = firebase
    .firestore()
    .collection('/users/1KRzPDi1gJ1sLcJUuwHN/chores');
  const chores = await ref.get();
  const data = [];
  chores.forEach((chore) => {
    data.push({ id: chore.id, ...chore.data() });
  });

  // map data to an array of path objects with params (id)
  const paths = data.map((chore) => {
    return {
      params: { id: chore.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const choreRef = firebase
    .firestore()
    .doc(`users/1KRzPDi1gJ1sLcJUuwHN/chores/${ctx.params.id}`);
  const data = await choreRef.get();
  const chore = { id: data.id, type: data.data().type };
  return { props: { chore } };
};

interface DetailPageProps {
  chore: InferGetStaticPropsType<typeof getStaticProps>;
}

const DetailPage = (props: DetailPageProps) => {
  return (
    <div>
      <h1>{props.chore.type}</h1>
    </div>
  );
};

export default DetailPage;
