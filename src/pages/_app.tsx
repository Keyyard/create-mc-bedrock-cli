import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Bedrock CLI</title>
        <meta
          name="description"
          content="The fastest way to start Minecraft Bedrock Addon development."
        />
      </Head>
      <div className={`${inter.variable} ${jetbrains.variable} bg-zinc-950 min-h-screen`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
