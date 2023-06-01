import Head from 'next/head';
import React, { ReactElement } from 'react';

export type MetaContents = {
  image?:
    | '/images/default_meta.png'
    | '/images/design_meta.png'
    | '/images/develop_meta.png'
    | '/images/plan_meta.png'
    | '/images/startup_meta.png'
    | '/images/market_meta.png';
  desc?: string;
  title?: string;
  keyword?: string;
};
const defaultMetaContents: MetaContents = {
  image: '/images/default_meta.png',
  desc: '꾸준한 회고와 기록을 통해 성장하세요. 매일, 매주, 매달 회고를 인증하고 브릭을 쌓을 수 있어요!',
  title: '브릭로그 - 일잘러의 회고 인증 플랫폼',
  keyword: '브릭로그, 회고, 커리어 성장, TIL, IT, 스타트업, 개발자, 디자이너, 기획자, 마케터',
};
const MetaHead = ({ metaContents }: { metaContents: MetaContents }) => {
  const { image, desc, title, keyword } = { ...defaultMetaContents, ...metaContents };

  // ! dev를 어떤 기준으로 나눌것인가?
  const websiteUrl = 'https://dev.bricklog.io';
  // https://dev.bricklog.io/images/meta/plan_meta.png
  const ImageUrl = `${websiteUrl}/images/meta${image}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='HandheldFriendly' content='True' />
        <meta name='MoblieOptimized' content='320' />
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
    </>
  );
};
export default MetaHead;
