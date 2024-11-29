/* do not change this file, it is auto generated by storybook. */

import { start, updateView } from "@storybook/react-native";

import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-actions/register";
import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";

const normalizedStories = [
  {
    titlePrefix: "",
    directory: "./src/components",
    files: "**/*.stories.(ts|tsx)",
    importPathMatcher:
      /^\.(?:(?:^|[\\/]|(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/])(?!\.)(?=.)[^\\/]*?\.stories\.(ts|tsx))$/,
    // @ts-ignore
    req: require.context(
      "../src/components",
      true,
      /^\.(?:(?:^|[\\/]|(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/])(?!\.)(?=.)[^\\/]*?\.stories\.(ts|tsx))$/
    ),
  },
  {
    titlePrefix: "",
    directory: "./src/screens",
    files: "**/*.stories.(ts|tsx)",
    importPathMatcher:
      /^\.(?:(?:^|[\\/]|(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/])(?!\.)(?=.)[^\\/]*?\.stories\.(ts|tsx))$/,
    // @ts-ignore
    req: require.context(
      "../src/screens",
      true,
      /^\.(?:(?:^|[\\/]|(?:(?:(?!(?:^|[\\/])\.).)*?)[\\/])(?!\.)(?=.)[^\\/]*?\.stories\.(ts|tsx))$/
    ),
  },
];

declare global {
  var view: ReturnType<typeof start>;
  var STORIES: typeof normalizedStories;
}

const annotations = [
  require("./preview"),
  require("@storybook/react-native/dist/preview"),
  require("@storybook/addon-actions/preview"),
];

global.STORIES = normalizedStories;

// @ts-ignore
module?.hot?.accept?.();

if (!global.view) {
  global.view = start({
    annotations,
    storyEntries: normalizedStories,
  });
} else {
  updateView(global.view, annotations, normalizedStories);
}

export const view = global.view;
