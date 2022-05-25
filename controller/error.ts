export class ControllerError {
    static async badRequest({ status = 400, message = ['invalid request'] }: { status?: number, message?: string[] }) {
        return {
            status,
            message
        }
    }
}