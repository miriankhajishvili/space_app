export function createRequestUrl(
    basePath: string,
    paramsObj: { [key: string]: any }
  ): string {
    let params = [];
  
    for (let key in paramsObj) {
      if (
        paramsObj.hasOwnProperty(key) &&
        paramsObj[key] !== null &&
        paramsObj[key] !== undefined &&
        paramsObj[key] !== ''
      ) {
        params.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`
        );
      }
    }
    return `${basePath}?${params.join('&')}`;
  }
  