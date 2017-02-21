const projectName = 'universal-react-starter-kit';

export default Object.freeze({
  title: projectName,
  description: 'All the modern best practices in one example.',
  head: {
    htmlAttributes: {
      lang: 'zh'
    },
    titleTemplate: 'ursk: %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'All the modern best practices in one example.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#2196F3' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: projectName },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: projectName },
      { name: 'msapplication-TileImage', content: '/images/touch/logo_144.png' },
      { name: 'msapplication-TileColor', content: '#2196F3' }
    ],
    link: [
      // { rel: 'canonical', href: 'https://xxx.com/' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/images/touch/logo_192.png' },
      { rel: 'manifest', href: '/manifest.json' }
    ],
    script: [],
  }

});
