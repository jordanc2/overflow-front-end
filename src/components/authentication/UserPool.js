/* eslint-disable */ 
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-2_E15FC2EsE',
    ClientId: '3r6539d6u20ogujjf809vlkiel'
}

export default new CognitoUserPool(poolData);