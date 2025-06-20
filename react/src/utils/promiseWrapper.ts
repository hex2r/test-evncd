const promiseWrapper = <T>(
  promise: Promise<T>
): Promise<{ data: T | undefined; error: Error | undefined }> =>
  promise
    .then((data: T) => ({ data, error: undefined }))
    .catch((error: Error) => ({ data: undefined, error }))

export default promiseWrapper
