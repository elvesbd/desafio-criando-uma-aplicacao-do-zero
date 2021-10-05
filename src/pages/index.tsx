import { GetStaticProps } from 'next';

import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida</p>
            <div className={styles.info}>
              <div>
                <img src="" alt="" />
                <time>15 mar 2021</time>
              </div>
              <div>
                <img src="" alt="" />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>

          <a href="#">
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida</p>
            <div className={styles.info}>
              <div>
                <img src="" alt="" />
                <time>15 mar 2021</time>
              </div>
              <div>
                <img src="" alt="" />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>

          <a href="#">
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida</p>
            <div className={styles.info}>
              <div>
                <img src="" alt="" />
                <time>15 mar 2021</time>
              </div>
              <div>
                <img src="" alt="" />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
