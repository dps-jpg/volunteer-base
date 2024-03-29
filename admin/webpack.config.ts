import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';
import path from 'path';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    src: path.resolve(__dirname, 'src'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
  };

  const apiUrl = env.apiUrl || 'http://localhost:5001/api';
  const mode: BuildMode = env.mode ?? 'development';
  const isDev = mode === 'development';
  const PORT = env.port ?? 3001;

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl
  });
};
