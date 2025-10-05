import { toast } from "react-toastify";

export function showFriendlyFetchError(err: unknown, context: string) {
  if (err instanceof TypeError && err.message === "Failed to fetch") {
    toast.error(
      <div>
        <strong>{context}:</strong>
        <br />
        Unable to reach the server. Please try again later.
      </div>,
      { autoClose: 8000 }
    );
  } else if (err instanceof Error) {
    toast.error(
      <div>
        <strong>{context}:</strong>
        <br />
        {err.message}
      </div>
    );
  } else {
    toast.error(
      <div>
        <strong>{context}:</strong>
        <br />
        An unexpected error occurred.
      </div>
    );
  }
}
