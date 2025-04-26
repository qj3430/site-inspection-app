import { EventType } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import authService from "./authService"
import { useEffect, useState } from "react"

const AuthProvider = ({ children }) => {
  const [instance, setInstance] = useState(null)

  useEffect(() => {
    let callbackId = null
    authService.getMsalInstance().then((msalInstance) => {
      setInstance(msalInstance)
      const accounts = msalInstance.getAllAccounts()

      if (!msalInstance.getActiveAccount() && accounts.length > 0) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
      }
      callbackId = msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
          const account = event.payload.account
          msalInstance.setActiveAccount(account)
          console.log(event.payload)
        }
      })
    })
    return () => {
      if (instance && callbackId) {
        instance.removeEventCallback(callbackId)
      }
    }
  }, [])

  if (!instance) return null

  return <MsalProvider instance={instance}> {children} </MsalProvider>

}

export default AuthProvider;
