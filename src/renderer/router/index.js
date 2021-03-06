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
      default: ({ params }) => ({ idx: Number(params.idx) }),
      title: ({ params }) => ({ idx: Number(params.idx) }),
      tools: ({ params }) => ({ idx: Number(params.idx) })
    }
  }, {
    path: '/monitor',
    name: 'monitor',
    components: {
      default: require('@/components/MonitorPage').default,
      title: { template: `<span>Monitor</span>` },
      tools: require('@/components/MonitorTools').default
    }
  }, {
    path: '/',
    redirect: '/projects'
  }]
})
