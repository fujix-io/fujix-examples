export declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      ENV_NAME?: string
      FUJIX_API_KEY: string
      FUJIX_PROJECT_URL: string
    }
  }
}
