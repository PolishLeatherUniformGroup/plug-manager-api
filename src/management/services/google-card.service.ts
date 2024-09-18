import { Injectable } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import jwt from 'jsonwebtoken';

@Injectable()
export class GoogleCardService {
    private readonly httpClient: GoogleAuth;
    private credentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    private issuerId = process.env.ISSUER_ID;
    private client
    private readonly baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

    constructor() {

    }

    public async createPassClass(): Promise<string> {
        const classId = `${this.issuerId}.plug_member_id`;
        let genericCard = {
            "id": `${classId}`,
            "classTemplateInfo": {
                "cardTemplateOverride": {
                    "cardRowTemplateInfos": [
                        {
                            "oneItem": {
                                "item": {
                                    "firstValue": {
                                        "fields": [
                                            {
                                                "fieldPath": "object.textModulesData['nr_karty']"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        };

        let response;
        try {
            // Check if the class exists already
            response = await this.httpClient.request({
                url: `${this.baseUrl}/genericClass/${classId}`,
                method: 'GET'
            });
            console.log('Class already exists');
            console.log(response);
            return classId;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                // Class does not exist
                // Create it now
                response = await this.httpClient.request({
                    url: `${this.baseUrl}/genericClass`,
                    method: 'POST',
                    data: genericCard
                });

                console.log('Class insert response');
                console.log(response);
                return classId;
            } else {
                // Something else went wrong
                console.log(err);
            }
        }
    }


    public async issueCard(classId: string, name: string, card: string): Promise<string> {
        let objectSuffix = `${card.replace(/[^\w.-]/g, '_')}`;
        let objectId = `${this.issuerId}.${objectSuffix}`;
        let genericObject = {
            "id": `${objectId}`,
            "classId": classId,
            "logo": {
                "sourceUri": {
                    "uri": "https://plug.org.pl/wp-content/uploads/2024/02/Logo_color_new.png"
                },
                "contentDescription": {
                    "defaultValue": {
                        "language": "pl-PL",
                        "value": "PLUG LOGO"
                    }
                }
            },
            "cardTitle": {
                "defaultValue": {
                    "language": "pl-PL",
                    "value": "Polish Leather Uniform Group"
                }
            },
            "header": {
                "defaultValue": {
                    "language": "pl-PL",
                    "value": `${name}`
                }
            },
            "textModulesData": [
                {
                    "id": "nr_karty",
                    "header": "NR KARTY",
                    "body": `${card}`
                }
            ],
            "barcode": {
                "type": "QR_CODE",
                "value": "https://verify.plug.org.pl/verify?card=" + card,
                "alternateText": ""
            },
            "hexBackgroundColor": "#3c4148"
        };
        const claims = {
            iss: this.credentials.client_email,
            aud: 'google',
            origins: [],
            typ: 'savetowallet',
            payload: {
                genericObjects: [
                    genericObject
                ]
            }
        };

        const token = jwt.sign(claims, this.credentials.private_key, { algorithm: 'RS256' });
        const saveUrl = `https://pay.google.com/gp/v/save/${token}`;
        return saveUrl;
    }

    public async expireObject(card: string): Promise<string> {
        let response;
        let objectSuffix = `${card.replace(/[^\w.-]/g, '_')}`;
        const resourceId = `${this.issuerId}.${objectSuffix}`;
        // Check if the object exists
        try {
            response = await this.httpClient.request({
                url: `${this.baseUrl}/genericObject/${resourceId}`,
                method: 'GET'
            });
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.log(`Object ${resourceId} not found!`);
                return `${resourceId}`;
            } else {
                // Something else went wrong...
                console.log(err);
                return `${resourceId}`;
            }
        }

        // Patch the object, setting the pass as expired
        let patchBody = {
            'state': 'EXPIRED'
        };

        response = await this.client.genericobject.patch({
            resourceId: `${this.issuerId}.${objectSuffix}`,
            requestBody: patchBody
        });
        response = await this.httpClient.request({
            url: `${this.baseUrl}/genericObject/${resourceId}`,
            method: 'PATCH',
            data: patchBody
        });
        console.log('Object expiration response');
        console.log(response);

        return `${resourceId}`;
    }

}
