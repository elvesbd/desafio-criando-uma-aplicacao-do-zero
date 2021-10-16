import { GetStaticPaths, GetStaticProps } from 'next';
import { Head } from 'next/document';
import Prismic from '@prismicio/client';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { Header } from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post(): JSX.Element {
  return (
    <>
      <Head>
        <title>Posts | spacetraveling</title>
      </Head>
      <Header />
      hello world
      {/* <img
        src="/images/banner.png"
        alt="banner post"
        className={styles.banner}
      />

      <main>
        <div>
          <div>
            <h1>Criando um app CRA do zero</h1>
            <div>
              <div>
                <FiCalendar />
                15 mar 2021
              </div>
              <div>
                <FiUser />
                Elves Brito
              </div>
              <div>
                <FiClock />5 min
              </div>
            </div>
          </div>
          <article>
            <h2>Proin et varius</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
              eum accusantium qui quia ea minima aperiam exercitationem,
              possimus, commodi amet omnis. Beatae fugit unde, itaque expedita
              eum ratione magnam fuga.
            </p>
          </article>
        </div>
      </main> */}
    </>
  );
}
