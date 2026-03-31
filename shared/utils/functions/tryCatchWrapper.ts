export const tryCatchWrapper = async <T>(
  tryCallback: () => Promise<T>,
  errorCallback: (error: Error) => void,
  finallyCallback?: () => void,
) => {
  try {
    return await tryCallback();
  } catch (e: unknown) {
    const error = e as Error;
    errorCallback(error);
    throw new Error(error.message);
  } finally {
    if (finallyCallback) finallyCallback();
  }
};
