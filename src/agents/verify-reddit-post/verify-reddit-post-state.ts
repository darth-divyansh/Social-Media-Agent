import { Annotation } from "@langchain/langgraph";
import { SimpleRedditPostWithComments } from "../../clients/reddit/types.js";
import {
  VerifyLinksGraphConfigurableAnnotation,
  VerifyLinksResultAnnotation,
} from "../verify-links/verify-links-state.js";
import { SKIP_CONTENT_RELEVANCY_CHECK } from "../generate-post/constants.js";

export const VerifyRedditPostAnnotation = Annotation.Root({
  /**
   * The reddit post to verify. Optional, if not provided then a `link`, or `postID` must be provided.
   */
  redditPost: Annotation<SimpleRedditPostWithComments | undefined>,
  /**
   * A link to a Reddit post. Optional, if not provided then a `redditPost` or `postID` must be provided.
   */
  link: Annotation<string | undefined>,
  /**
   * The ID of a Reddit post. Optional, if not provided then a `redditPost` or `link` must be provided.
   */
  postID: Annotation<string | undefined>,
  /**
   * The external URLs found in the body of the Reddit post.
   */
  externalURLs: Annotation<string[]>({
    reducer: (state, update) => state.concat(update),
    default: () => [],
  }),
  // REQUIRED DUE TO USING SHARED NODES
  ...VerifyLinksResultAnnotation.spec,
});

export const VerifyRedditPostConfigurableAnnotation = Annotation.Root({
  ...VerifyLinksGraphConfigurableAnnotation.spec,
});

export type VerifyRedditPostConfigurable =
  typeof VerifyRedditPostConfigurableAnnotation.State;

export const BASE_VERIFY_REDDIT_CONFIG: VerifyRedditPostConfigurable = {
  [SKIP_CONTENT_RELEVANCY_CHECK]: undefined,
};
