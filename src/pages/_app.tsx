import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const isDocs = router.pathname.startsWith("/docs");
  // Marketing pages are always-dark by design; docs respect the theme toggle.
  const bg = isDocs ? "bg-white dark:bg-zinc-950" : "bg-zinc-950";
  return (
    <>
      <Head>
        <title>Create Bedrock CLI</title>
        <meta
          name="description"
          content="The fastest way to start Minecraft Bedrock Addon development."
        />
      </Head>
      <div className={`${inter.variable} ${jetbrains.variable} ${bg} min-h-screen`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
