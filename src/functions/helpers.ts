
export function jsonResponse(statusCode: number, body: any) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

export function unauthorizedResponse() {
    return jsonResponse(401, {
        error: 'Unauthorized'
    });
}