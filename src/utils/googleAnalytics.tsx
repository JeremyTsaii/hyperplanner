import ReactGA from 'react-ga'

export const initGA = (): void => {
  ReactGA.initialize('UA-168532476-1')
}

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
