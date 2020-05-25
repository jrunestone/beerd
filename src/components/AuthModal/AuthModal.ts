import { Component, Vue, Prop } from 'vue-property-decorator';
import NetlifyIdentity from 'netlify-identity-widget';

@Component
export default class AuthModal extends Vue {
    isAuthenticated: boolean = false;

    created() {
        NetlifyIdentity.init();
        NetlifyIdentity.on('login', this.userAuthAction);
    }

    mounted() {
        this.isAuthenticated = NetlifyIdentity.currentUser() !== null;

        if (!this.isAuthenticated && location.hash.indexOf('invite_token') === -1) {
            NetlifyIdentity.open('login');
        }
    }

    userAuthAction(user: NetlifyIdentity.User) {
        console.log('login', user);

        // this.currentUser = {
        //     username: user.user_metadata.full_name,
        //     email: user.email,
        //     access_token: user.token?.access_token,
        //     expires_at: user.token?.expires_at,
        //     refresh_token: user.token?.refresh_token,
        //     token_type: user.token?.token_type
        // };
    }
}