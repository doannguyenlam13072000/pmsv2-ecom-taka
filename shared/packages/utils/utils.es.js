const o = (t) => new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(t), u = (t, e = "USD") => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: e
}).format(t), m = (t, e) => {
  let r = null;
  return (...n) => {
    r !== null && clearTimeout(r), r = setTimeout(() => t(...n), e);
  };
}, a = () => Math.random().toString(36).substring(2, 9);
export {
  m as debounce,
  u as formatCurrency,
  o as formatDate,
  a as generateId
};
