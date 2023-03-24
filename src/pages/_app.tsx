import "@fontsource/ibm-plex-sans";
import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>AGS Gap</title>
        <meta name="description" content="AGS Gap management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#A1B0C3] to-[#535D82] px-8 2xl:px-16">
        <Component {...pageProps}/>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
export { reportWebVitals } from 'next-axiom';
