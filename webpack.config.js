module.exports = {
  entry: './app/main.tsx',
  output: {
    filename: './www/bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  devtool: 'source-map',
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "remarkable": "Remarkable",
    "jquery": "$"
  },
}
