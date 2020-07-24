export const getVisits = async (url, date) => {
  const res = await fetch(`/track?url=${url}&date=${date}`);
  const json = await res.json();
  return json ? json.visits : null;
};

export const toDateInputValue = (date) => {
  const copy = new Date(date);
  copy.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return copy.toJSON().slice(0, 10);
};
