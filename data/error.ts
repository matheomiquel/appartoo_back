export class DataError {
    static async badRequest({ status = 400, message = 'invalid request' }: { status?: number, message?: string }) {
        return {
            status,
            message: [message]
        }
    }
    static async notFound({ status = 404, message = 'resource not found' }: { status?: number, message?: string }) {
        return {
            status,
            message: [message]
        }
    }
    static async conflict({ status = 409, message = 'resource not found' }: { status?: number, message?: string }) {
        return {
            status,
            message: [message]
        }
    }
}