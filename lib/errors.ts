export function handleResponseError(e: unknown) {
  if (e instanceof Error) {
    return {
      data: null,
      error: e.message,
    };
  }

  return {
    data: null,
    error: "Something went wrong",
  };
}
