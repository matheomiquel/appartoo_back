export class DomainError {
    static async conflict({ status = 409, message = 'conflict' }: { status?: number, message?: string }) {
        return {
            status,
            message: [message]
        }
    }
    static async notFound({ status = 404, message = 'ressource not found' }: { status?: number, message?: string }) {
        return {
            status,
            message: [message]
        }
    }
}