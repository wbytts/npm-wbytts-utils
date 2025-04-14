import {preventDefault} from "./prevent-default";

/**
 * Enable touchmove event.
 */
export const enableTouchMove = () => {
  document.body.removeEventListener("touchmove", preventDefault);
};

