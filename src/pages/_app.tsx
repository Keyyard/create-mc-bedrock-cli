import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Bedrock CLI</title>
        <meta name="description" content="The fastest way to start Minecraft Bedrock Addon development!" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
