import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="The fastest way to start Minecraft Bedrock Addon development!" />

      <meta property="og:title" content="Create Bedrock CLI" />
      <meta property="og:description" content="The fastest way to start Minecraft Bedrock Addon development!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bedrockcli.keyyard.xyz/" />
      <meta property="og:image" content="https://bedrockcli.keyyard.xyz/medias/create-bedrock-cli-banner.png" />
      <meta property="og:site_name" content="Create Bedrock CLI" />
    </Head>
    <body className="antialiased">
      <Main />
      <NextScript />
    </body>
  </Html>
  );
}
