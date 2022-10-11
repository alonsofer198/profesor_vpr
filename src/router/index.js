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
    path: '/sedes',
    name: 'sedes',
    props: {
      default: true,
      navigation: true
    },
    components: {
      default: () => import('@/pages/Sedes')
    }
  }
]

export default routes