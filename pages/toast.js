import Head from "next/head";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import Nav from "../components/Nav";
import NotificationToaster from "../components/NotificationToaster";
import styles from "../styles/Home.module.css";
import signJwt from "../lib/knockJwt";

export default function Home() {
  const sendNotification = useDebouncedCallback(() => {
    const usage = Math.round(Math.random() * 10 + 80);
    fetch(`/api/notify?percentUsage=${usage}`, { method: "POST" });
  }, 500);
  return (
    <div className={styles.container}>
      <Head>
        <title>Notifications Test: knock.app (Toasts)</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Notifications Test: knock.app" />
        <meta
          name="description"
          content="Simple demo powered by NextJS, Vercel, and knock.app"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Notifications Test: knock.app" />
        <meta
          property="og:description"
          content="Simple demo powered by NextJS, Vercel, and knock.app"
        />
        <meta
          property="og:image"
          content="https://demo-knock-app.vercel.app/preview.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="Notifications Test: knock.app"
        />
        <meta
          property="twitter:description"
          content="Simple demo powered by NextJS, Vercel, and knock.app"
        />
        <meta
          property="twitter:image"
          content="https://demo-knock-app.vercel.app/preview.png"
        />
      </Head>
      <Nav />
      <NotificationToaster />
      <main className={styles.main}>
        <h1 className={styles.title}>Toasts</h1>
        <h2 className={styles.subtitle}>Pop-up notifications in real time</h2>

        <section className={styles.actions}>
          <h3 className={styles.subtitle}>Try it out</h3>
          <br />
          <button className={styles.cta} onClick={sendNotification}>
            Send a fake usage warning notification
          </button>
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const userToken = await signJwt();
  return {
    props: {
      userToken,
    },
  };
}
