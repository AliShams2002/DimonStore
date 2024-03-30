const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/js/app.js',
    output: {
        filename: 'final.js',
        path: path.resolve(__dirname,'./public/js')
    }
}