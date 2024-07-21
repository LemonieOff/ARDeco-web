export class FetchError extends Error {
    response: Response;

    constructor(response: Response, message: string | null = null) {
        if (!message) message = "Error while fetching data";
        super(message);
        this.name = "FetchError";
        this.response = response;
    }
}
