import { AuthData } from "../interface/AuthData"
import { OPENED_API } from "./api/api"
import { URL } from "./api/url"

interface LoginReponse {
    token_type: string,
    access_token: string,
    access_token_expires_at: number,
    refresh_token: string,
    refresh_token_expires_at: number
}

const login = async (email: string, password: string): Promise<AuthData> => {
  const response = await OPENED_API().post(URL.LOGIN, { 
    email: email, 
    password: password, 
  })
    .catch((error) => {
      throw error
    })

  const data = response.data as LoginReponse

  return {
    tokenType: data.token_type,
    accessToken: data.access_token,
    accessTokenExpiresAt: data.access_token_expires_at,
    refreshToken: data.refresh_token,
    refreshTokenExpiresAt: data.refresh_token_expires_at,
  }
}

const saveToLocalStorage = (authData: AuthData) => {
  localStorage.setItem("authData", JSON.stringify(authData))
}

const getFromLocalStorage = (): AuthData | null => {
  const authData = localStorage.getItem("authData")
  if (authData) {
    return JSON.parse(authData) as AuthData
  } else {
    return null
  }
}

const removeFromLocalStorage = () => {
  localStorage.removeItem("authData")
}

const refresh = async (refreshToken: string): Promise<AuthData> => {
  const response = await OPENED_API().post(URL.REFRESH, { 
    // eslint-disable-next-line camelcase
    refresh_token: refreshToken, 
  })
    .catch((error) => {
      throw error
    })

  const data = response.data as LoginReponse

  return {
    tokenType: data.token_type,
    accessToken: data.access_token,
    accessTokenExpiresAt: data.access_token_expires_at,
    refreshToken: data.refresh_token,
    refreshTokenExpiresAt: data.refresh_token_expires_at,
  }
}

const signup = async (name: string, email: string, bio: string, phone: string, password: string, photo: string): Promise<AuthData> => {
  const response = await OPENED_API().post(URL.SIGNUP, { 
    name: name,
    email: email,
    bio: bio,
    phone: phone, 
    password: password, 
    photo: photo,
  })
    .catch((error) => {
      throw error
    })

  const data = response.data as LoginReponse

  return {
    tokenType: data.token_type,
    accessToken: data.access_token,
    accessTokenExpiresAt: data.access_token_expires_at,
    refreshToken: data.refresh_token,
    refreshTokenExpiresAt: data.refresh_token_expires_at,
  }
}

const onLogin = async (email: string, password: string) => {
  const data = await login(email, password)
  saveToLocalStorage(data)

  return data
}

const onSignup = async (name: string, email: string, bio: string, phone: string, password: string, photo: string) => {
  const data = await signup(name, email, bio, phone, password, photo)
  saveToLocalStorage(data)

  return data
}

const onRefresh = async (refreshToken: string) => {
  const data = await refresh(refreshToken)
  saveToLocalStorage(data)

  return data
}

const onLogout = () => {
  removeFromLocalStorage()
}

const onLoad = () => {
  const data = getFromLocalStorage()

  return data
}

export const useAuth = () => {
  return { 
    onLogin,
    onSignup,
    onRefresh,
    onLogout,
    onLoad,
  }
}
