export default ({app: {router}}) => {
  router.scrollTo = function (anchor) {
    router.push({path: `#${anchor}`, query: router.currentRoute.query})
    const anchorElement = document.getElementById(anchor)
    anchorElement.setAttribute('tabindex', '-1')
    anchorElement.focus()
    anchorElement.scrollIntoView(true)
  }
}
