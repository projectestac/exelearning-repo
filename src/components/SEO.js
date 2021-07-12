import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ title, author, description, lang = 'en', alt = [], meta = [], thumbnail = null, sd = null, ...props }) {

  const metaTags = [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: description,
    },
  ].concat(meta);

  if (thumbnail) {
    metaTags.push(
      {
        name: 'twitter:image',
        content: thumbnail,
      },
      {
        property: 'og:image',
        content: thumbnail,
      },
    );
  }

  const links = alt.map(({ lang, href }) => ({
    rel: 'alternate',
    hreflang: lang,
    href,
  }));

  return (
    <Helmet
      {...props}
    >
      <html lang={lang} />
      <title>{title}</title>
      {metaTags.map((m, n) => <meta key={n} {...m} />)}
      {sd && <script type="application/ld+json" className="structured-data-list">{JSON.stringify(sd)}</script>}
      {links.map((l, n) => <link key={n} {...l} />)}
    </Helmet>
  );
}

export default SEO;
