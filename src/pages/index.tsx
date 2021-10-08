import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RichText } from 'prismic-dom';

import Head from 'next/head';
import { title } from 'process';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import ApiSearchResponse from '@prismicio/client/types/ApiSearchResponse';
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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);
  const [newPost, setNewPost] = useState(postsPagination.next_page);

  async function handleGetNewPost() {
    /* fetch(newPost)
      .then(response => response.json()) // retorna uma promise
      .then(results => {
        console.log(results.results[0].data);
      })
      .catch(err => {
        // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
      }); */
    const loadMorePostsResponse: ApiSearchResponse = await (
      await fetch(postsPagination.next_page)
    ).json();

    setPosts(oldPosts => [...oldPosts, ...loadMorePostsResponse.results]);
    console.log(loadMorePostsResponse.results);
  }

  return (
    <>
      <Head>
        <title>Inicio | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.uid} href="#">
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div className={styles.info}>
                <div className={styles.time}>
                  <AiOutlineCalendar />
                  <time>{post.first_publication_date}</time>
                </div>
                <div className={styles.user}>
                  <FiUser />
                  <span>{post.data.author}</span>
                </div>
              </div>
            </a>
          ))}
          {newPost && (
            <button onClick={handleGetNewPost} type="button">
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 1,
      page: 2,
    }
  );
  console.log(postsResponse);
  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd  LLL  yyy',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };
  return {
    props: { postsPagination },
    // revalidate: 60 * 60 * 6,
  };
};
