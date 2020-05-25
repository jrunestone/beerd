import { Component, Vue } from 'vue-property-decorator';
import AuthModal from '@/components/AuthModal/AuthModal.vue';
import AuthService from '@/services/AuthService';

@Component({
    components: {
        AuthModal
    }
})
export default class Auth extends Vue {
    token: string | null = null;

    isAuthenticated(): boolean {
        return AuthService.isAuthenticated();
    }

    async startAuthUntappd() {
        const response = await fetch('/.netlify/functions/token', await AuthService.getAuthHeaders());
        const url = await response.json();
        window.location = url.url;
    }

    async finishAuthUntappd(authCode: string) {
        const response = await fetch(`/.netlify/functions/token?code=${authCode}`, await AuthService.getAuthHeaders());
        const token = await response.json();
        this.token = token.token;
    }

    async created() {
        const authCode = this.$route.query.code;

        if (authCode) {
            await this.finishAuthUntappd(authCode.toString());
        }
    }
}