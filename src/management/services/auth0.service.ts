import { Injectable, Logger } from '@nestjs/common';
import { MemberActivatedEvent } from '../integration/events/member-activated.event';
import axios from 'axios';



@Injectable()
export class Auth0Service {
    private readonly logger = new Logger(Auth0Service.name);
    constructor() { }

    private async getAuth0Token(): Promise<string> {

        var options = {
            method: 'POST',
            url: 'https://plug-org.eu.auth0.com/oauth/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.AUTH0_API_CLIENT_ID,
                client_secret: process.env.AUTH0_API_CLIENT_SECRET,
                audience: process.env.AUTH0_API_AUDIENCE
            })
        };
        this.logger.log(`Getting Auth0 token with ${JSON.stringify(options)}`);
        const { data } = await axios.request(options);
        return data.access_token;
    }

    async createAccount(event: MemberActivatedEvent) {
        const data = JSON.stringify({
            "email": event.email,
            "blocked": false,
            "email_verified": false,
            "given_name": event.firstName,
            "family_name": event.lastName,
            "nickname": event.card,
            "connection": "Username-Password-Authentication",
            "password": "plug-1N!t",
            "verify_email": true
        });

        this.logger.log(`Creating account with ${ data }`);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://plug-org.eu.auth0.com/api/v2/users',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${ await this.getAuth0Token() }`
            },
            data: data
        };

        const response = await axios.request(config);
        if (response.status === 201) {

        }
    }
}
