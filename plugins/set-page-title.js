export default ({app}) => {
  app.setPageTitle = function (title) {
    app.head.title = title
  }
}
