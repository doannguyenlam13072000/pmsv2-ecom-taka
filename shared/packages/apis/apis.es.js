const e = async (o) => {
  try {
    return await (await fetch(o)).json();
  } catch (r) {
    throw console.error("API Error:", r), r;
  }
}, s = async (o, r) => {
  try {
    return await (await fetch(o, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(r)
    })).json();
  } catch (t) {
    throw console.error("API Error:", t), t;
  }
};
export {
  e as fetchData,
  s as postData
};
