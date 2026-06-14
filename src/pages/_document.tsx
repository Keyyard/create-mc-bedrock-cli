import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
    <Head>
      <link rel="icon" href="/icon.ico" />
      <meta name="description" content="The zero-setup way to build and deploy Minecraft Bedrock add-ons in TypeScript or JavaScript." />

      <meta property="og:title" content="Bedrock CLI" />
      <meta property="og:description" content="The zero-setup way to build and deploy Minecraft Bedrock add-ons in TypeScript or JavaScript." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bedrockcli.keyyard.xyz/" />
      <meta property="og:image" content="https://bedrockcli.keyyard.xyz/medias/favicon.ico" />
      <meta property="og:site_name" content="Bedrock CLI" />
    </Head>
    <body className="antialiased">
      <Main />
      <NextScript />
    </body>
  </Html>
  );
}
