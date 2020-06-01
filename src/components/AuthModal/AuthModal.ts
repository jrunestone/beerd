import { Component, Vue, Prop } from 'vue-property-decorator';
// @ts-ignore
import NetlifyIdentity from 'netlify-identity-widget';

@Component
export default class AuthModal extends Vue {
    isInvite: boolean = false;

    created() {
        this.isInvite = location.hash.indexOf('invite_token') !== -1;
        NetlifyIdentity.on('login', this.onLogin);
        NetlifyIdentity.init();
    }

    mounted() {
        const isAuthenticated = NetlifyIdentity.currentUser() !== null;

        if (!isAuthenticated && !this.isInvite) {
            NetlifyIdentity.open('login');
        }
    }

    onLogin() {
        window.location.href = '/';
    }
}