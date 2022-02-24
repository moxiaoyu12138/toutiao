module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue: 37.5,
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 配置不需要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
