import "../styles/globals.css";

import {
  KnockFeedProvider,
} from "@knocklabs/react-notification-feed";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) {
    return <Component {...pageProps} />;
  }
  return (
    <KnockFeedProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_KEY}
      feedId={"b9f050a3-c6df-4bf6-b59c-8783e9ea6ee7"}
      userId={"Alice"}
      userToken={pageProps.userToken || null}
    >
      <Component {...pageProps} />
    </KnockFeedProvider>
  );
}

export default MyApp;
