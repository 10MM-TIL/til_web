import Head from 'next/head';
import Script from 'next/script';
import React, { ReactElement } from 'react';

export type MetaContents = {
  image?:
    | '/default_meta.png'
    | '/design_meta.png'
    | '/develop_meta.png'
    | '/plan_meta.png'
    | '/startup_meta.png'
    | '/market_meta.png';
  desc?: string;
  title?: string;
  keyword?: string;
};
const defaultMetaContents: MetaContents = {
  image: '/default_meta.png',
  desc: '꾸준한 회고와 기록을 통해 성장하세요. 매일, 매주, 매달 회고를 인증하고 브릭을 쌓을 수 있어요!',
  title: '브릭로그 - 일잘러의 회고 인증 플랫폼',
  keyword: '브릭로그, 회고, 커리어 성장, TIL, IT, 스타트업, 개발자, 디자이너, 기획자, 마케터',
};
const MetaHead = ({ metaContents }: { metaContents: MetaContents }) => {
  const GTM_ID = process.env.NEXT_PUBLIC_MODE === 'dev' ? 'GTM-N7L3R9R' : 'GTM-MT882MC';
  const GA_ID = process.env.NEXT_PUBLIC_MODE === 'dev' ? 'G-6999GQFZ90' : 'G-F0D85SJYQX';
  const { image, desc, title, keyword } = { ...defaultMetaContents, ...metaContents };

  const websiteUrl = process.env.NEXT_PUBLIC_MODE === 'dev' ? 'https://dev.bricklog.io' : 'https://bricklog.io';
  // https://dev.bricklog.io/images/meta/plan_meta.png
  const ImageUrl = `${websiteUrl}/images/meta${image}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='HandheldFriendly' content='True' />
        <meta name='MobileOptimized' content='320' />
        <meta
          name='viewport'
          content='user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, width=device-width, initial-scale=1.0'
        />
        <meta name='description' content={desc} />
        <meta name='keywords' content={keyword} />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={ImageUrl} />
        <meta property='og:description' content={desc} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:image' content={ImageUrl} />
        <meta name='twitter:description' content={desc}></meta>
        <link rel='shortcut icon' type='image/x-icon' href='/bricklog.ico' sizes='16' />
      </Head>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></Script>
      <Script
        id='ga-id'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');`,
        }}
      ></Script>

      <Script
        id='gtm-id'
        dangerouslySetInnerHTML={{
          __html: `        
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
            `,
        }}
      />
    </>
  );
};
export default MetaHead;
