// Configuration for the HTML pages (headers/titles/scripts/css/etc).
// We make use of react-helmet to consume the values below.
// @see https://github.com/nfl/react-helmet

/* eslint-disable */
import logo16 from '../../static/images/16.png';
import logo32 from '../../static/images/32.png';
import logo128 from '../../static/images/128.png';
import logo144 from '../../static/images/144.png';
import logo152 from '../../static/images/152.png';
import logo192 from '../../static/images/192.png';
import logo256 from '../../static/images/256.png';
import logo512 from '../../static/images/512.png';
import manifest from '../../static/manifest.json';
/* eslint-enable */

export default Object.freeze({
  head: {
    // titleTemplate: '%s_',
    meta: [
      // Default content encoding.
      { charset: 'utf-8' },
      // This is important to signify your application is mobile responsive!
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Providing a theme color is good if you are doing a progressive
      // web application.
      { name: 'theme-color', content: '#2196F3' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'application-name', content: '' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: '' },
      { name: 'msapplication-TileImage', content: logo144 },
      { name: 'msapplication-TileColor', content: '#2196F3' }
    ],
    link: [
      // When building a progressive web application you need to supply
      // a manifest.json as well as a variety of icon types. This can be
      // tricky. Luckily there is a service to help you with this.
      // http://realfavicongenerator.net/
      { rel: 'icon', type: 'image/png', href: logo32, sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: logo16, sizes: '16x16' },
      { rel: 'apple-touch-icon', href: logo192 },
    ],
    script: []
  }

});
