export class DataError {
    static async badRequest({ message = 'invalid request' }: { message?: string }) {
        return {
            status: 400,
            message: [message]
        }
    }
    static async notFound({ message = 'resource not found' }: { message?: string }) {
        return {
            status: 404,
            message: [message]
        }
    }
    static async conflict({ message = 'resource not found' }: { message?: string }) {
        return {
            status: 409,
            message: [message]
        }
    }
}