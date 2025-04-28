import {Injectable} from "@angular/core";
import {fetchAuthSession, signOut} from "aws-amplify/auth";
import {Router} from "@angular/router";
import {AuthSession} from "@aws-amplify/core/src/singleton/Auth/types";

@Injectable()
export class AuthService {

    private session: AuthSession | undefined;

    constructor(private router: Router) {
    }

    async currentSession() {
        return fetchAuthSession()
            .then(session => {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (session) {
                    return session;
                }
                return undefined;
            })
            .catch(() => {
                return undefined;
            })
    }

    async getAuthToken() {
        try {
            this.session = await this.currentSession()
            const token = this.session?.tokens?.idToken?.toString()
            if (token == undefined) {
                return 'undefined'
            }
            return token;
        } catch (err) {
            return 'undefined'
        }
    }

    async hasValidSession(): Promise<boolean> {
        try {
            this.session = await this.currentSession();
            return true;
        } catch (err) {
            return false;
        }
    }

    async logout() {
        console.log('AuthService.logout');
        try {
            this.session = undefined;
            void this.router.navigateByUrl('/login')
            await signOut();
            location.reload();
            console.log('Signed out');
        } catch (err) {
            console.log('Failed to sign out', err);
        }
    }

}