import { Title, Meta, Link } from "react-head";

const SEO = ({ title, description, image, url }) => (
    <>
        <Title>{title}</Title>
        <Meta name="description" content={description} />
        <Meta property="og:title" content={title} />
        <Meta property="og:description" content={description} />
        <Meta property="og:image" content={image} />
        <Meta property="og:type" content="website" />
        <Meta property="og:url" content={url} />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content={title} />
        <Meta name="twitter:description" content={description} />
        <Meta name="twitter:image" content={image} />
        <Link rel="canonical" href={url} />
    </>
);

export default SEO;
