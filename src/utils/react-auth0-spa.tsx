// https://github.com/auth0/auth0-spa-js/pull/310
// https://github.com/tommedema/startup-boilerplate/blob/master/packages/react-app/src/lib/auth0.tsx
import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client, {
  Auth0Client,
  PopupLoginOptions,
  RedirectLoginResult,
  getIdTokenClaimsOptions,
  IdToken,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  Auth0ClientOptions,
} from '@auth0/auth0-spa-js'

type Auth0User = Omit<IdToken, '__raw'>

interface IAuth0Context {
  isAuthenticated: boolean
  // eslint-disable-next-line
  user: any
  loading: boolean
  popupOpen: boolean
  loginWithPopup(options: PopupLoginOptions): Promise<void>
  handleRedirectCallback(): Promise<RedirectLoginResult>
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
}

interface IAuth0ProviderOptions {
  children: React.ReactElement
  onRedirectCallback?(
    result: RedirectLoginResult | { targetUrl: string | null | undefined },
  ): void
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const Auth0Context = React.createContext<IAuth0Context | null>(null)
export const useAuth0 = (): IAuth0Context => useContext(Auth0Context)!
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: IAuth0ProviderOptions & Auth0ClientOptions): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<Auth0User>()
  const [auth0Client, setAuth0] = useState<Auth0Client>()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const newIsAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(newIsAuthenticated)

      if (isAuthenticated) {
        const newUser = await auth0FromHook.getUser()
        setUser(newUser)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (o: PopupLoginOptions) => {
    setPopupOpen(true)
    try {
      await auth0Client!.loginWithPopup(o)
    } finally {
      setPopupOpen(false)
    }
    const newUser = await auth0Client!.getUser()
    setUser(newUser)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    const result = await auth0Client!.handleRedirectCallback()
    const newUser = await auth0Client!.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(newUser)
    return result
  }
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (o: getIdTokenClaimsOptions | undefined) =>
          auth0Client!.getIdTokenClaims(o),
        loginWithRedirect: (o: RedirectLoginOptions) =>
          auth0Client!.loginWithRedirect(o),
        getTokenSilently: (o: GetTokenSilentlyOptions | undefined) =>
          auth0Client!.getTokenSilently(o),
        getTokenWithPopup: (o: GetTokenWithPopupOptions | undefined) =>
          auth0Client!.getTokenWithPopup(o),
        logout: (o: LogoutOptions | undefined) => auth0Client!.logout(o),
      }}>
      {children}
    </Auth0Context.Provider>
  )
}

Auth0Provider.defaultProps = {
  onRedirectCallback: null,
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */
