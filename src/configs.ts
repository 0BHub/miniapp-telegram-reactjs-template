type Environment = 'development' | 'test' | 'production';

// Use import.meta.env instead of process.env
export const env = (import.meta.env.MODE as Environment) || 'development';

type Config = {
  mainnet: string;
  holesky: string;
  projectId: string;
};

const requireEnvVar = (name: string): string => {
  const value = import.meta.env[`VITE_${name}`];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const configs: Record<Environment, Config> = {
  development: {
    holesky: requireEnvVar('HOLESKY_URL'),
    mainnet: requireEnvVar('MAINNET_URL'),
    projectId: requireEnvVar('PROJECT_ID')
  },
  test: {
    holesky: requireEnvVar('HOLESKY_URL'),
    mainnet: requireEnvVar('MAINNET_URL'),
    projectId: requireEnvVar('PROJECT_ID'),
  },
  production: {
    holesky: requireEnvVar('HOLESKY_URL'),
    mainnet: requireEnvVar('MAINNET_URL'),
    projectId: requireEnvVar('PROJECT_ID'),
  },
};

// Add runtime check to ensure env is valid
if (!configs[env]) {
  throw new Error(`Invalid environment: ${env}`);
}

export default configs[env];