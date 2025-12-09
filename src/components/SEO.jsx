import { Helmet } from 'react-helmet-async';

function SEO({ title, description, image, url }) {
    const siteTitle = "Euforión";
    const defaultDescription = "Biblioteca Euforión: Educación Incial, Primaria y Secundaria. Biblioteca popular y centro cultural en La Plata.";
    const defaultImage = "/images/logo-euforion.png";
    const siteUrl = "https://euforion.org.ar"; // Replace with actual domain

    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`} />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`} />
        </Helmet>
    );
}

export default SEO;
