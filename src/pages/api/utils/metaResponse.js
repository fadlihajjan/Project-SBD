export default function metaResponse(status, message, data, error) {
    if (data === undefined && error !== undefined) {
        const response = {
            status,
            message,
            error
        };
        return response;
    }
    const response = {
      status,
      message,
      result : data
    };
    return response;
}