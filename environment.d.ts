declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
      LOGIN: string
      PASSWORD: string
      TOKEN_SECRET: string
      REFRESH_SECRET: string
    }
  }
}
export {}
