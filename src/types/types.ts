export type HttpErrorType = {
    success: boolean
    status: number
    request: {
        ip: string | undefined
        path: string
    }
    message: string
    data: null
    trace?: string | null
}

export type HttpResponseType = {
    success: boolean
    status: number
    message: string
    data: unknown
}
