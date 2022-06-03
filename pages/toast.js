import Head from 'next/head'
import Image from 'next/image'
import NotificationFeed from '../components/NotificationFeed'
import { useDebouncedCallback } from 'use-debounce';
import styles from '../styles/Home.module.css'
import NotificationToaster from '../components/NotificationToaster';

export default function Home() {
  const sendNotification = useDebouncedCallback(() => {
    const usage = Math.round(Math.random() * 10 + 80)
    fetch(`/api/notify?percentUsage=${usage}`, {'method': 'POST'})
  }, 1000)
  return (
    <div className={styles.container}>
      <Head>
        <title>Toast | Knock</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.feed}>
        <NotificationToaster />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Knock Demo
        </h1>
        <button onClick={sendNotification}>Send a usage warning</button>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
