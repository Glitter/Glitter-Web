import ReactGA, { EventArgs } from 'react-ga';

const GA_TRACKING_CODES = {
  production: process.env.NEXT_PUBLIC_GA_PRODUCTION || '',
  staging: process.env.NEXT_PUBLIC_GA_STAGING || '',
};

const getTrackingCode = () => {
  if (typeof window === 'undefined') {
    return GA_TRACKING_CODES.staging;
  }

  return window.location.host === 'tryglitter.com'
    ? GA_TRACKING_CODES.production
    : GA_TRACKING_CODES.staging;
};

if (typeof window !== 'undefined') {
  ReactGA.initialize(getTrackingCode());
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export const emitEvent = (args: EventArgs) => {
  if (typeof window === 'undefined') {
    return;
  }

  ReactGA.event(args);
};

export const onRouteChange = () => {
  if (typeof window === 'undefined') {
    return;
  }

  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
