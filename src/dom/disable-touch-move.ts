import {preventDefault} from "./prevent-default";

/**
 * Disable touchmove event.
 */
export const disableTouchMove = () => {
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
};

