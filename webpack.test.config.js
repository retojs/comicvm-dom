module.exports = {
    mode: 'development',
    output: {
        filename: '[name]'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                options: { allowTsInNodeModules: true }
            }
        ]
    }
};