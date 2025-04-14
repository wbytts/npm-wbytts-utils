import {preventDefault} from "./prevent-default";

/**
 * 禁用触摸移动事件，防止页面滚动
 */
export const disableTouchMove = () => {
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
};
