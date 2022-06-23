export class DomainError {
    static async conflict({ message = 'conflict' }: { message?: string }) {
        return {
            status: 409,
            message: [message]
        }
    }
    static async notFound({ message = 'ressource not found' }: { message?: string }) {
        return {
            status: 404,
            message: [message]
        }
    }
}