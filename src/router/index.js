export const routes = [
  {
    path: '/',
    name: 'home',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/Home'),
    }
  },
  {
    path: '/evolucion-de-denuncias',
    name: 'evolucion',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/TopWidget')
    }
  },
  {
    path: '/mapa-de-denuncias',
    name: 'mapa',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/MapaDenuncias')
    }
  },
  {
    path: '/convicciones-y-arrestos',
    name: 'convicciones',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/Conviccionesyarrestos')
    }
  },
  {
    path: '/denuncias-policia',
    name: 'denunciaspolicia',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/DenunciasPolicia')
    }
  },
  {
    path: '/denuncias-por-region',
    name: 'denunciasporregion',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/DenunciasPorRegion')
    }
  },
  {
    path: '/tipo-de-agresion',
    name: 'tipodeagresion',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/TipoDeAgresion')
    }
  }
]

export default routes