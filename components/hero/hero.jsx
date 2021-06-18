import gql from "graphql-tag";

export default function Hero({ heading, tagline, image }) {
    return (
        <>
            <h1>{heading}</h1>
            <h2>{tagline}</h2>
        </>
    );
}

Hero.fragment = gql`
    fragment Hero on Hero {
        heading
        tagline
        image {
            asset {
                url
            }
        }
    }
`;