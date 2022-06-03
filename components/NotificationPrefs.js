import React, { useEffect, useState } from "react";
import Knock from "@knocklabs/client";
import { useMemo } from "react";

const workflowLabels = {
  "usage-warning": "Usage Warning",
};

const channelTypeLabels = {
  in_app_feed: "In-app",
};


const PreferenceCenter = () => {
  const user = useMemo(() => ({ id: "Alice" }), []);
  const [preferences, setPreferences] = useState();

  // Setup our Knock client
  const knockClient = useMemo(() => {
    const knockClient = new Knock(process.env.NEXT_PUBLIC_KNOCK_KEY);
    knockClient.authenticate(user.id);
    return knockClient;
  }, [user]);

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
    <div className="preferences">
      {Object.keys(preferences.workflows || workflowLabels).map(
        (workflowKey) => {
          const workflowChannelPreferences = preferences?.workflows
            ? preferences.workflows[workflowKey].channel_types
            : { in_app_feed: true };

          return (
            <div className="preferences__row" key={workflowKey}>
              <div className="preferences__row-workflow">
                {workflowLabels[workflowKey]}
              </div>

              <div className="preferences__row-channel-types">
                {Object.keys(workflowChannelPreferences).map((channelType) => {
                  // Loop over all the channel types and render a checkbox and a label
                  // per channel type setting in the workflow.
                  const preferenceSetting =
                    workflowChannelPreferences[channelType];

                  return (
                    <div
                      className="preferences__row-channel-type"
                      key={channelType}
                    >
                      <label>
                        {channelTypeLabels[channelType]}

                        <input
                          type="checkbox"
                          checked={preferenceSetting}
                          onChange={() =>
                            onPreferenceChange(
                              workflowKey,
                              channelType,
                              !preferenceSetting
                            )
                          }
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

const PreferenceCenterClient = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <></>;
  return <PreferenceCenter />;
};

export default PreferenceCenterClient;
