export default {
  oidc: {
    clientId: '0oa3vowlatFC5oa4L5d6',
    issuer: 'https://dev-2586981.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    pkce: true,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:3000/users',
  },
};
