
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const client = new SecretsManagerClient({ region: "us-east-1" });

let cachedSecrets;

const getSecrets = async () => {
  if (cachedSecrets) return cachedSecrets;

  const command = new GetSecretValueCommand({
    SecretId: "splitwise/prod/app",
  });

  const response = await client.send(command);
  cachedSecrets = JSON.parse(response.SecretString);
  return cachedSecrets;
};

module.exports = getSecrets;