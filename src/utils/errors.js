const errorMessages = {
  "23505": "This record already exists.",
  "23503": "This record is still being used and cannot be removed.",
  "42501": "You do not have permission to perform this action.",
  PGRST116: "The requested record could not be found.",
};

export function getUserFriendlyError(error, fallback = "Something went wrong. Please try again.") {
  if (import.meta.env.DEV && error) {
    console.error("Application error:", error);
  }

  if (!error) return fallback;

  const code = error.code || error.status;
  if (code && errorMessages[code]) {
    return errorMessages[code];
  }

  const message = String(error.message || "").toLowerCase();
  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("fetch")
  ) {
    return "Network connection failed. Check your connection and try again.";
  }

  return fallback;
}

export function logError(context, error) {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  }
}
