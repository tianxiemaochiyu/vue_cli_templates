/**
 * 存储sessionStorage
 */
export const setSessionStore = (name: string, content: string): void => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  try {
    window.sessionStorage.setItem(name, content);
  } catch (error) {
    console.warn("无痕模式下不支持存储，err:%s", error);
    window.sessionStorage.removeItem(name);
  }
};

/**
 * 获取sessionStorage
 */
export const getSessionStore = (name: string): string | null | void => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeSessionStore = (name: string): string | null | void => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * 存储localStorage
 */
export const setLocalStore = (name: string, content: string | Record<string, unknown> | null): void => {
  if (!name) return;
  let str = "";
  if (typeof content !== "string") {
    str = JSON.stringify(content);
  } else {
    str = content;
  }
  try {
    window.localStorage.setItem(name, str);
  } catch (error) {
    console.warn("无痕模式下不支持存储，err:%s", error);
    window.localStorage.removeItem(name);
  }
};

/**
 * 获取localStorage
 */
export const getLocalStore = (name: string): Record<string, unknown> | null | void => {
  if (!name) return;
  const result = window.localStorage.getItem(name);
  return result ? JSON.parse(result) : result;
};

/**
 * 删除localStorage
 */
export const removeLocalStore = (name: string): void => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
