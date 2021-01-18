const OktaJwtVerifier = require("@okta/jwt-verifier");
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`, // required
});
const authenticationRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  // The expected audience passed to verifyAccessToken() is required, and can be either a string (direct match) or
  // an array  of strings (the actual aud claim in the token must match one of the strings).
  const expectedAudience = "api://default";

  if (!match) {
    res.status(401);
    return next("Unauthorized");
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
};

module.exports = { authenticationRequired };
