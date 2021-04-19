/* eslint-disable no-underscore-dangle, no-bitwise */
export function uuid() {
  let d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function formatUrl(url, params = {}) {
  const regex = /(\{.+?\})/gi;
  const _params = { ...params };

  const _url = url.replace(regex, (v) => {
    const replacable = v[0] === "{";

    if (!replacable) {
      return v;
    }

    const propName = v.slice(1, -1);
    const replacedValue = _params[propName];

    _params[propName] = undefined;

    return replacedValue;
  });

  return _url;
}
