import { AuthClient } from "@dfinity/auth-client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { canisterId, createActor } from "../declarations/WEAZID"

const AuthContext = createContext()

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`,
  },
}

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authClient, setAuthClient] = useState(null)
  const [identity, setIdentity] = useState(null)
  const [principal, setPrincipal] = useState(null)
  const [weazIDActor, setWeazIDActor] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState(false)
  const [changes, setChanges] = useState(null)

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client)
    })
  }, [])

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient)
      },
    })
  }

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated()
    setIsAuthenticated(isAuthenticated)

    const identity = client.getIdentity()
    setIdentity(identity)
    console.log("identity :", identity)

    const principal = identity.getPrincipal()

    console.log("principal :", principal.toString())
    setPrincipal(principal)

    setAuthClient(client)

    const actor = await createActor(canisterId, {
      agentOptions: {
        identity,
      },
    })

    sessionStorage.setItem("WEAZID_ACTOR", actor)
    setWeazIDActor(actor)
  }

  async function logout() {
    await authClient?.logout()
    await updateClient(authClient)
  }

  return {
    weazIDActor,
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    isLoading,
    setIsLoading,
    notification,
    changes,
    setChanges,
    setNotification,
  }
}

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
