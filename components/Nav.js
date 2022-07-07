import React from "react";
import Link from "next/link";
import NotificationFeed from "./NotificationFeed";
import Avatar from "./Avatar";
import styles from "../styles/Home.module.css";

class NotificationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>(Notification error)</h1>;
    }

    return this.props.children;
  }
}

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <section>
        <Link href="/">Demo Knock App</Link>
        <Link href="/toast">Toasts</Link>
        <Link href="/settings">Settings</Link>
      </section>
      <section>
        <NotificationErrorBoundary>
          <NotificationFeed />
        </NotificationErrorBoundary>
        <Avatar />
      </section>
    </nav>
  );
}
