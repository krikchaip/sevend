import Store from 'electron-store'

// Managing user data across all processes
global.data = new Store({
  defaults: {
    appProjects: []
  },
  name: 'data',
  encryptionKey:
    process.env.NODE_ENV !== 'development'
      ? 'data-secret' : undefined
})
