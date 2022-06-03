import React, { useEffect, useState } from "react";
import { Knock } from "@knocklabs/client";

import { useCurrentUser } from "./hooks";

const workflowLabels = {
  comment: "New comments",
  like: "Document likes",
  alert: "Alerts",
};

const channelTypeLabels = {
  sms: "SMS",
  email: "Email",
  push: "Push",
};

const PreferenceCenter = () => {
  const { user } = useCurrentUser();
  const [preferences, setPreferences] = useState();

  // Setup our Knock client
  const knockClient = useMemo(() => {
    const knockClient = new Knock(process.env.KNOCK_PUBLIC_API_KEY);
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

    const preferences = await knockClient.preferences.set(preferenceUpdate);

    // Set the updated preferences
    setPreferences(preferences);
  };

  // Display our UI
  if (!preferences) {
    return <span>(Loading ...)</span>;
  }

  return (
    <div className="preferences">
      <h2>Preferences</h2>

      {Object.keys(preferences.workflows).map((workflowKey) => {
        const workflowChannelPreferences =
          preferences.workflows[workflowKey].channel_types;

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
                        value={preferenceSetting}
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
      })}
    </div>
  );
};
