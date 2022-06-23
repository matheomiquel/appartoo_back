export class ControllerError {
    static async badRequest({ message = ['invalid request'] }: { message?: string[] }) {
        return {
            status: 400,
            message
        }
    }
}