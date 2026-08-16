import {
  Source
} from "./_browser-chunks/chunk-SPXYZZB5.js";
import "./_browser-chunks/chunk-UAWMPV5J.js";

// src/manager.tsx
import React, { useEffect, useState } from "react";
import { AddonPanel } from "storybook/internal/components";
import { addons, types, useChannel, useParameter } from "storybook/manager-api";
import { ignoreSsrWarning, styled, useTheme } from "storybook/theming";
import {
  ADDON_ID,
  PANEL_ID,
  PARAM_KEY,
  shouldWaitForServiceSnippet,
  SNIPPET_RENDERED
} from "storybook/internal/docs-tools";
var CodePanel = ({
  active,
  lastEvent,
  currentStoryId,
  storyParameters,
  storyPrepared
}) => {
  let lastEventMatchesCurrentStory = lastEvent?.id === currentStoryId, [codeSnippet, setSourceCode] = useState({
    source: lastEventMatchesCurrentStory ? lastEvent?.source : void 0,
    format: lastEventMatchesCurrentStory ? lastEvent?.format ?? void 0 : void 0
  }), parameter = useParameter(PARAM_KEY, {
    source: { code: "" },
    theme: "dark"
  });
  useEffect(() => {
    setSourceCode({
      source: void 0,
      format: void 0
    });
  }, [currentStoryId]), useChannel(
    {
      [SNIPPET_RENDERED]: ({ id, source, format }) => {
        id !== void 0 && id !== currentStoryId || setSourceCode({ source, format });
      }
    },
    [currentStoryId]
  );
  let isDark = useTheme().base !== "light", awaitingServiceSnippet = shouldWaitForServiceSnippet(storyParameters, storyPrepared), code = parameter.source?.code || codeSnippet.source || (awaitingServiceSnippet ? "" : parameter.source?.originalSource);
  return React.createElement(AddonPanel, { active: !!active }, React.createElement(SourceStyles, null, React.createElement(Source, { ...parameter.source, code, format: codeSnippet.format, dark: isDark })));
};
addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    title: "Code",
    type: types.PANEL,
    paramKey: PARAM_KEY,
    /**
     * This code panel can be enabled by adding this parameter:
     *
     * @example
     *
     * ```ts
     *  parameters: {
     *    docs: {
     *      codePanel: true,
     *    },
     *  },
     * ```
     */
    disabled: (parameters) => !parameters?.docs?.codePanel,
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => {
      let channel = api.getChannel(), currentStory = api.getCurrentStoryData(), lastEvent = channel?.last(SNIPPET_RENDERED)?.[0];
      return React.createElement(
        CodePanel,
        {
          currentStoryId: currentStory?.id,
          storyParameters: currentStory?.parameters,
          storyPrepared: currentStory?.prepared,
          lastEvent,
          active
        }
      );
    }
  });
});
var SourceStyles = styled.div(() => ({
  height: "100%",
  [`> :first-child${ignoreSsrWarning}`]: {
    margin: 0,
    height: "100%",
    boxShadow: "none"
  }
}));
