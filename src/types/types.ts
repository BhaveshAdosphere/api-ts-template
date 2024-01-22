// Exporting Type (Http Error)
export type THttpError = {
    success: boolean
    status: number
    request: {
        method: string
        ip: string | undefined
        url: string
    }
    message: string
    data: null
    trace?: object | null
}

// Exporting Type (Http Response)
export type THttpResponse = {
    success: boolean
    status: number
    request: {
        method: string
        ip: string | undefined
        url: string
    }
    message: string
    data: unknown
}
