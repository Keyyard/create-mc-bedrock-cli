import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Inter, JetBrains_Mono, Be_Vietnam_Pro } from "next/font/google";

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
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDocs = router.pathname.startsWith("/docs");
  // Marketing pages are always-dark by design; docs respect the theme toggle.
  // For marketing routes, force the `dark` class on the local wrapper so the
  // CSS variables resolve to the dark palette regardless of next-themes state.
  const themeOverride = isDocs ? "" : "dark";
  return (
    <>
      <Head>
        <title>Bedrock CLI</title>
        <meta
          name="description"
          content="The zero-setup way to build and deploy Minecraft Bedrock add-ons in TypeScript or JavaScript."
        />
      </Head>
      <div
        className={`${themeOverride} ${inter.variable} ${jetbrains.variable} ${beVietnamPro.variable} bg-light min-h-screen`}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
