import Link from "next/link";
import NotificationFeed from "./NotificationFeed";
import NotificationToaster from "./NotificationToaster";
import Avatar from "./Avatar";
import styles from "../styles/Home.module.css";



export default function Nav() {
  return (
    <nav className={styles.nav}>
      <section>
        <Link href="/">Demo Knock App</Link>
        <Link href="/settings">Settings</Link>
      </section>
      <section>
        <NotificationFeed />
        <NotificationToaster />
        <Avatar />
      </section>
    </nav>
  );
}
