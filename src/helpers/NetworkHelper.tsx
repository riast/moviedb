import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

// an axios request modified to timeout on connection timeout.

export async function getWithTimeout(
  url: string,
  config?: AxiosRequestConfig | undefined,
  connectionTimeout: number = 30000,
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    let didTimeOut = false;
    let context = setTimeout(() => {
      didTimeOut = true;
      console.log('timedout');

      reject(new Error('Request timed out.'));
    }, connectionTimeout);

    axios
      .get(url, {
        ...config,
      })
      .then((response) => {
        // Clear the timeout as cleanup
        // clearTimeout(timeout);
        console.log('timeoutcleared');

        clearTimeout(context);
        if (!didTimeOut) {
          resolve(response);
        }
      })
      .catch((error) => {
        // Rejection already happened with setTimeout
        if (didTimeOut) return;
        // Reject with error

        reject(error);
      });
  });
}
