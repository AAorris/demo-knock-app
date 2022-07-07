import { useState, useRef, useEffect } from "react";
import {
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
  useKnockFeed,
} from "@knocklabs/react-notification-feed";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react-notification-feed/dist/index.css";

const NotificationFeed = () => {
  const [ready, setReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { useFeedStore } = useKnockFeed();
  const items = useFeedStore((store) => {
    return store.metadata.total_count;
  });
  useEffect(() => setReady(true), []);
  if (!ready) return <></>;
  return (
    <span data-itemcount={items}>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </span>
  );
};

export default NotificationFeed;
