import { useRouter } from "next/router";
import { gql } from '@apollo/client'
import { client } from "./_app";
import Hero from '../components/hero/hero';

export default function Page() {
    const router = useRouter();
    const { slug } = router.query

    return <h1>{slug}</h1>
}

export async function getStaticProps({ params, preview = false }) {
    const GET_DATA = gql`
      query getPageBySlug($slug: String!) {
        allPage(where: { slug: { current: { eq: $slug } } }) {
          _id
          pageName
          slug {
            current
          }
          pageBuilder {
            __typename
            ...Hero
          }
        }
      }
      ${Hero.fragment}
    `;

    const { data } = await client.query({ query: GET_DATA, variables: { slug: params.slug } });

    console.log(data);


  return {
    props: {
      preview,
      data: { },
    },
  };
}

export async function getStaticPaths() {
    const GET_PATHS = gql`
      query getAllPageSlugs {
        allPage {
          _id
          pageName
          slug {
            current
          }
        }
      }
    `;

    const { data } = await client.query({ query: GET_PATHS });

    const paths = data.allPage.map(({ slug }) => {
        return {
            params: { slug: slug.current }
        };
    })

    return {
        paths,
        fallback: false
    };
}