// @ts-ignore
import NetlifyIdentity from 'netlify-identity-widget';

export default class AuthService {
    static hasClientAuthHeaders(context: any): boolean {
        const claims: boolean = context.clientContext && context.clientContext.user;
        return claims;
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