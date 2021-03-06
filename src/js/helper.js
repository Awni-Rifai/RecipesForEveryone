import { TIMEOUT_SECONDS } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const ajax = async function (url, uploadData = undefined) {
  try {
    let fetchPromise;
    if (!uploadData) {
      fetchPromise = fetch(url);
    } else {
      fetchPromise = fetch(url, {
        method: 'POST',
        /*snippest of text that conatinas information about the request itself*/
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      });
    }
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
//export const getJSON = async function (url) {
