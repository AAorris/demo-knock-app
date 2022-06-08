import React, { useEffect, useState } from "react";
import Knock from "@knocklabs/client";
import { useMemo } from "react";
import styles from "../styles/Prefs.module.css";

const workflowLabels = {
  "usage-warning": "Usage Warning",
};

const channelTypeLabels = {
  in_app_feed: "Web notifications",
};

const PreferenceCenter = ({ userToken=undefined }) => {
  const user = useMemo(() => ({ id: "Alice" }), []);
  const [preferences, setPreferences] = useState();

  // Setup our Knock client
  const knockClient = useMemo(() => {
    const knockClient = new Knock(process.env.NEXT_PUBLIC_KNOCK_KEY);
    knockClient.authenticate(user.id, userToken);
    return knockClient;
  }, [user, userToken]);

  // Read the preferences for the current user
  useEffect(() => {
    const fetchPreferences = async () => {
      const preferences = await knockClient.preferences.get();
      setPreferences(preferences);
    };

    fetchPreferences();
  }, [knockClient]);

  const onPreferenceChange = async (workflowKey, channelType, setting) => {
    const preferenceUpdate = {
      [workflowKey]: {
        channel_types: {
          [channelType]: setting,
        },
      },
    };

    const preferences = await knockClient.preferences.set({
      workflows: preferenceUpdate,
    });

    // Set the updated preferences
    setPreferences(preferences);
  };

  // Display our UI
  if (!preferences) {
    return <span>(Loading ...)</span>;
  }

  return (
    <div className={styles.container}>
      {Object.keys(preferences.workflows || workflowLabels).map(
        (workflowKey) => {
          const workflowChannelPreferences = preferences?.workflows
            ? preferences.workflows[workflowKey].channel_types
            : { in_app_feed: true };

          return (
            <fieldset className={styles.row} key={workflowKey}>
              <legend className={styles.rowWorkflow}>
                {workflowLabels[workflowKey]}
              </legend>

              <div className={styles.rowChannelTypes}>
                {Object.keys(workflowChannelPreferences).map((channelType) => {
                  // Loop over all the channel types and render a checkbox and a label
                  // per channel type setting in the workflow.
                  const preferenceSetting =
                    workflowChannelPreferences[channelType];

                  return (
                    <div className={styles.rowChannelType} key={channelType}>
                      <label className={styles.label}>
                        {channelTypeLabels[channelType]}
                      </label>

                      <input
                        type="checkbox"
                        checked={preferenceSetting}
                        className={styles.input}
                        onChange={() =>
                          onPreferenceChange(
                            workflowKey,
                            channelType,
                            !preferenceSetting
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        }
      )}
    </div>
  );
};

const PreferenceCenterClient = ({ userToken }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <></>;
  return <PreferenceCenter userToken={userToken} />;
};

export default PreferenceCenterClient;
