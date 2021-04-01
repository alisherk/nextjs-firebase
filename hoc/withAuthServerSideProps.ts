import { firebaseAdmin } from 'gateway/serverApp';
import { Token } from 'gateway/types';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

interface Args {
  context?: GetServerSidePropsContext;
  token?: Token;
}

export const withAuthServerSideProps = <T>(type: PropertyKey) => (
  fn?: ({ context, token }: Args) => Promise<T>
) => async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  try {
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    if (fn) {
      return {
        props: {
          token,
          [type]: (await fn({ context, token })) as T,
        },
      };
    }
    return { props: { token } };
  } catch (err) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
    //or redirect like this
    /*    return {
            // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
      redirect: {
        permanent: false,
        destination: '/login',
      },

    }; */
  }
};
