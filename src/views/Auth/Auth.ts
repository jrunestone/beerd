import { Component, Vue } from 'vue-property-decorator';
import AuthModal from '@/components/AuthModal/AuthModal.vue';
import AuthService from '@/services/AuthService';

@Component({
    components: {
        AuthModal
    }
})
export default class Auth extends Vue {
    isAuthenticated(): boolean {
        return AuthService.isAuthenticated();
    }

    async startAuthUntappd() {
        let url = await (await fetch('/.netlify/functions/token', await AuthService.getAuthHeaders())).json();
        console.log(url);
    }
}