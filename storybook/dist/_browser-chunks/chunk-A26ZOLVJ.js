import {
  Channel
} from "./chunk-KK3JJ3E4.js";

// src/channels/mock-channel.ts
function mockChannel() {
  return new Channel({
    transport: { setHandler: () => {
    }, send: () => {
    } }
  });
}

// src/shared/constants/tags.ts
var Tag = {
  /** Indicates that autodocs should be generated for this component */
  AUTODOCS: "autodocs",
  /** MDX documentation attached to a component's stories file */
  ATTACHED_MDX: "attached-mdx",
  /** Standalone MDX documentation not attached to stories */
  UNATTACHED_MDX: "unattached-mdx",
  /** Story has a play function */
  PLAY_FN: "play-fn",
  /** Story has a test function */
  TEST_FN: "test-fn",
  /** Development environment tag */
  DEV: "dev",
  /** Test environment tag */
  TEST: "test",
  /** Manifest generation tag */
  MANIFEST: "manifest"
}, BUILT_IN_FILTERS = {
  _docs: (entry, excluded) => excluded ? entry.type !== "docs" : entry.type === "docs",
  _play: (entry, excluded) => excluded ? entry.type !== "story" || !entry.tags?.includes(Tag.PLAY_FN) : entry.type === "story" && !!entry.tags?.includes(Tag.PLAY_FN),
  _test: (entry, excluded) => excluded ? entry.type !== "story" || entry.subtype !== "test" : entry.type === "story" && entry.subtype === "test"
}, USER_TAG_FILTER = (tag) => (entry, excluded) => excluded ? !entry.tags?.includes(tag) : !!entry.tags?.includes(tag);

export {
  mockChannel,
  Tag,
  BUILT_IN_FILTERS,
  USER_TAG_FILTER
};
