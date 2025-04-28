import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Amplify} from 'aws-amplify'
import {sessionStorage} from 'aws-amplify/utils';
import {cognitoUserPoolsTokenProvider} from 'aws-amplify/auth/cognito';
import {lastValueFrom} from "rxjs";

export class Ids {
    constructor(
        readonly region: string,
        readonly userPoolId: string,
        readonly insurerUIClientId: string,
        readonly authDomain: string) {}
}

@Injectable()
export class AuthConfigurationService {
    private auth: AuthConfig;

    constructor(private readonly http: HttpClient) {
    }

    async configure(): Promise<void> {
        return this.loadIds().then(ids => {
            this.auth = {
                region: ids.region,
                Cognito: {
                    userPoolId: ids.userPoolId,
                    userPoolClientId: ids.insurerUIClientId,
                    loginWith: {
                        oauth: {
                            domain: ids.authDomain,
                            scopes: [] as string[],
                            redirectSignIn: [this.loginCallbackUrl],
                            redirectSignOut: [this.logoutCallbackUrl],
                            responseType: 'code'
                        }
                    }
                },
                mandatorySignIn: false,
            }

            console.log('AuthService.configure configuring Amplify');
            Amplify.configure({
                Auth: this.auth
            })
            cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);
        })
    }

    private get loginCallbackUrl() {
        return window.location.href.split('/').slice(0, 3).concat('login').join('/')
    }

    private get logoutCallbackUrl() {
        return window.location.origin
    }

    private async loadIds(): Promise<Ids> {
        const idsFile = `assets/ids.json`;

        return await lastValueFrom(
            this.http.get<IdFile>(`/${idsFile}`)
        )
            .then(idFile => {
                // @ts-ignore
                const ids = new Ids(idFile.Region, idFile.UserPoolId, idFile.InsurerUIClientId, idFile.InsurerAuthDomain);

                console.log(`AuthService.loadIds loaded are: ${JSON.stringify(ids)}`);
                return ids;
            })
            .catch(err => {
                throw err;
            })
    }
}

interface AuthConfig {
    region: string
    Cognito: {
        userPoolId: string
        userPoolClientId: string,
        loginWith: {
            oauth: {
                domain: string
                scopes: string[]
                redirectSignIn: string[]
                redirectSignOut: string[]
                responseType: 'code'
            }
        }
    },
    mandatorySignIn: boolean
}

interface IdFile {
    Region: string
    UserPoolId: string
    InsurerUIClientId: string
    InsurerAuthDomain: string
}