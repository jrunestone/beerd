import 'bootstrap/bootstrap-env';

// @ts-ignore
import NetlifyIdentity from 'netlify-identity-widget';

const serviceAccessToken: string = process.env.SERVICE_ACCESS_TOKEN;

export default class AuthService {
    static hasClientAuthHeaders(context: any): boolean {
        const claims: boolean = context.clientContext && context.clientContext.user;
        return claims;
    }

    static hasServiceToken(event: any): boolean {
        return event.headers['access-token'] == serviceAccessToken;
    }

    static isAuthenticated(): boolean {
        NetlifyIdentity.init();
        return NetlifyIdentity.currentUser() !== null;
    }

    static async getAuthHeaders(){
        NetlifyIdentity.init();
        const token: string = await NetlifyIdentity.refresh();

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    }
}