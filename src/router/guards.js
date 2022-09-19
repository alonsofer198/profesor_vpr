export default function ({ router }) {

  function legacyRouterMode ({ fullPath }, from, next) {
    if (fullPath.substr(0, 2) === '/#') {
      const path = fullPath.substr(2)
      next(path)
      return
    }
    next()
  }

  router.beforeEach(legacyRouterMode)

  return router
}
