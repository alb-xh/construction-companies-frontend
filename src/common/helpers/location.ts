import { useState, useEffect } from 'react';


export type QueryParams = {
  page: string,
  pageSize: string,
}

export class Location {
  static getUrl (): string {
    return window.location.href;
  }

  static getQueryParams (): QueryParams {
    return {
      page: 'p',
      pageSize: 'size',
    };
  }

  static getQueryString (): URLSearchParams {
    const url = new URL(Location.getUrl());
    const qs = url.searchParams;

    return qs;
  }

  static getPageSize (args: { initialSize: number, count?: number }): number {
    const { count, initialSize } = args;

    const qs = Location.getQueryString();
    const qsParams = Location.getQueryParams();

    const pageSize = Number(qs.get(qsParams.pageSize));

    const minSize = initialSize;
    const maxSize = count && count > minSize ? count : minSize;

    if (Number.isNaN(pageSize) || pageSize < minSize) return minSize;
    else if (pageSize > maxSize) return maxSize;

    return pageSize;
  }

  static getPageIndex (args: { initialSize: number, initialIndex: number, count?: number }): number {
    const { count, initialSize, initialIndex } = args;

    const pageSize = Location.getPageSize({ count, initialSize });
    const maxNrPages = Math.ceil((count || pageSize) / pageSize);

    const qs = Location.getQueryString();
    const qsParams = Location.getQueryParams();

    const pageIndex = Number(qs.get(qsParams.page));

    if (Number.isNaN(pageIndex) || pageIndex < initialIndex) return initialIndex;
    else if (pageIndex > maxNrPages) return maxNrPages;

    return pageIndex;
  }

  static redirect (url: string): void {
    if (window.history.pushState) {
      const state = { path: url };

      window.history.pushState(state , '', url);

      const popStateEvent = new PopStateEvent('popstate', { state: state });
      window.dispatchEvent(popStateEvent);
    } else {
      window.location.href = url;
    }
  }

  static useUrl = (): string => {
    const [url, setUrl] = useState(Location.getUrl());

    const listenToPopstate = () => {
      const url = Location.getUrl();
      setUrl(url);
    };

    useEffect(() => {
      window.addEventListener('popstate', listenToPopstate);
      return () => {
        window.removeEventListener('popstate', listenToPopstate);
      };
    }, []);

    return url;
  };
}


