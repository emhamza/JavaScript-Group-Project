const mockResponse = (status, statusText, response) => new window.Response(response, {
  status,
  statusText,
  headers: {
    'Content-type': 'application/json',
  },
});

// eslint-disable-next-line max-len
const mockFetch = (data, status = 200) => Promise.resolve(mockResponse(status, null, JSON.stringify(data)));

export default mockFetch;