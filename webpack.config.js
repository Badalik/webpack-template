import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import CopyPlugin from 'copy-webpack-plugin';
import PugPlugin from 'pug-plugin';
import 'webpack-dev-server';

const DEV_MODE_NAME = 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mode = process.env.NODE_ENV ?? DEV_MODE_NAME;
const isDevMode = mode === DEV_MODE_NAME;

const generatePages = (dir) => {
  const obj = {};
  const templateFiles = fs.readdirSync(path.resolve(__dirname, dir));

  for (const item of templateFiles) {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    obj[name] = `${dir}/${name}.${extension}`;
  }

  return obj;
};

export default {
  mode,
  target: isDevMode ? 'web' : 'browserslist',
  devtool: isDevMode ? 'inline-source-map' : undefined,
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    // compress: true,
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s?css|sass)$/,
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-combine-media-query',
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      {
        test: /favicon/,
        type: 'asset/resource',
        generator: {
          filename: 'images/favicon/[name][ext][query]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.(webmanifest|txt|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new PugPlugin({
      pretty: true,
      entry: generatePages('./src/app/pages'),
      js: {
        filename: 'scripts/app.[contenthash:8].js',
      },
      css: {
        filename: 'styles/app.[contenthash:8].css',
      },
      data: {
        jv0: 'javascript:void(0);',
      },
    }),
    new CopyPlugin({
      patterns: [
        'src/resources/robots.txt',
        {
          from: 'src/resources/assets/images/favicon',
          to: 'images/favicon',
          // noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
