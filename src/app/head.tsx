import Script from 'next/script';

export default function Head() {
  return (
    <>
      <title>Sai Vikranth Kanuru | AI Engineer</title>
      <meta name="description" content="Personal portfolio of Sai Vikranth Kanuru, an AI Engineer specializing in Generative AI and Agentic Systems." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <Script src="/init.js" strategy="beforeInteractive" />
    </>
  );
}
