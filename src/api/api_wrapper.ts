export async function fetchJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    // handle non-2xx responses (e.g. 4xx, 5xx)
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} ${response.statusText} (${url})`
      );
    }

    // SUCCESSFUL RESPONSE - attempt to parse and return JSON body
    return await response.json();
  } catch (err) {
    /* 
     * This catch handles:
        - Network errors (e.g. no internet, DNS failure, CORS failure, server offline/doesn't respond/times out, etc.)
        - any unhandled exceptions thrown above (non-2xx responses, JSON parsing errors, etc. - includes bad JSON from successful 200 response))
     */
    console.error("Fetch error:", err);

    // ** Re-throw the error so caller can handle it (e.g. show user alert, etc.) **
    throw err;
  }
}
