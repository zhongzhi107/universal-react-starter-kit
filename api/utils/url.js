// eslint-disable-next-line
export function mapUrl(availableActions = {}, url = []) {
  const notFound = { action: null, params: [] };

  // test for empty input
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  const reducer = (prev, current) => {
    if (prev.action && prev.action[current]) {
      // go deeper
      return { action: prev.action[current], params: [] };
    }
    if (typeof prev.action === 'function') {
      // params are found
      return { action: prev.action, params: prev.params.concat(current) };
    }
    return notFound;
  };

  const actionAndParams = url.reduce(reducer, { action: availableActions, params: [] });

  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}
