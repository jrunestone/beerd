import { Component, Vue, Prop } from 'vue-property-decorator';
import NetlifyIdentity from 'netlify-identity-widget';

@Component
export default class AuthModal extends Vue {
    isAuthenticated: boolean = false;

    created() {
        NetlifyIdentity.init();
    }

    mounted() {
        this.isAuthenticated = NetlifyIdentity.currentUser() !== null;

        if (!this.isAuthenticated && location.hash.indexOf('invite_token') === -1) {
            NetlifyIdentity.open('login');
        }
    }
}