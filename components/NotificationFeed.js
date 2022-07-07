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
  const { useFeedStore } = useKnockFeed();
  const items = useFeedStore((store) => {
    return store.metadata.total_count;
  });
  return <span>Total Count: {items}</span>;
};

export default NotificationFeed;
