import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Avatar from "./Avatar";
import styles from "../styles/Home.module.css";

const NotificationFeed = dynamic(() => import("./NotificationFeed"), {
  ssr: false,
  loading: () => <>...</>,
});

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <section>
        <Link href="/">Demo Knock App</Link>
        <Link href="/toast">Toasts</Link>
        <Link href="/settings">Settings</Link>
      </section>
      <section>
        <NotificationFeed />
        <Avatar />
      </section>
    </nav>
  );
}
