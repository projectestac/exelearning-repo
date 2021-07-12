/*!
 *  File    : components/SEO.js
 *  Created : 2021-07-12
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  eXeLearning repo
 *  Embeddable front-end for a repository of eXeLearning resources
 *  https://projectes.xtec.cat/exelearning
 *
 *  @source https://github.com/projectestac/exelearning-repo
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

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
