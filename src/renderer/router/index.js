import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/projects',
    name: 'projects',
    components: {
      default: require('@/components/ProjectsList').default,
      title: { template: `<span>Projects</span>` },
      tools: require('@/components/ProjectsTools').default
    }
  }, {
    path: '/projects/:idx',
    name: 'projects-item',
    components: {
      default: require('@/components/ProjectsItem').default,
      title: require('@/components/ProjectsTitleItem').default,
      tools: require('@/components/ProjectsToolsItem').default
    },
    props: {
      default: false,
      title: ({ params }) => ({ idx: Number(params.idx) }),
      tools: ({ params }) => ({ idx: Number(params.idx) })
    }
  }, {
    path: '/',
    redirect: '/projects'
  }]
})
