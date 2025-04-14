/**
 * 将图片blob对象转换为base64url
 * @param blob
 * @param cb
 */
export const loadImageAsBase64URL = (blob: any, cb: Function) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.addEventListener("load", () => {
    const base64URL = reader.result;
    cb(base64URL);
  });
};

