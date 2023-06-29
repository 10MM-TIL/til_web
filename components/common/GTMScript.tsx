const GTM_ID = process.env.NEXT_PUBLIC_MODE === 'dev' ? 'GTM-N7L3R9R' : 'GTM-MT882MC';

const GTMScript = () => {
  return (
    <>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src='https://www.googletagmanager.com/ns.html?id=${GTM_ID}' height='0' width='0' style='display:none;visibility:hidden'></iframe>        
        `,
        }}
      />
    </>
  );
};

export default GTMScript;
