import Store from 'electron-store'

// Managing user data across all processes
global.data = new Store({
  defaults: { appProjects: [] },
  name: 'data',
  encryptionKey: 'data-secret'
})

// Only for debugging purpose
// Will clear data when restart main process
process.env.NODE_ENV === 'development'
  && data.set('appProjects', [])
