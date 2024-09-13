import { detectDeviceType } from './detect-device-type';

/**
 * 使用 scroll 解决IOS输入的问题. (仅Mobile)
 *
 */
export const iosInputScrollFix = () => {
  const isMobile = detectDeviceType() === 'Mobile';
  if (isMobile) {
    document.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('blur', () => {
        window.scrollBy(0, -1);
      });
    });
  }
};
