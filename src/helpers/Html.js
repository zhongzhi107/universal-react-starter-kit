import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from 'config';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape({
      styles: PropTypes.object,
      javascript: PropTypes.object,
    }),
    component: PropTypes.node.isRequired,
    // eslint-disable-next-line
    store: PropTypes.object.isRequired,
  };

  static defaultProps = {
    assets: {
      styles: [],
      javascript: [],
    }
  };

  render() {
    const { buildConfig: { commonChunks } } = config;
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    // Insert dll javascript into page if environment is development
    if (__DEVELOPMENT__ && commonChunks && Object.keys(commonChunks).length > 0) {
      Object.keys(commonChunks).forEach((chunk) => {
        if (chunk in assets.javascript) {
          console.error('[error]: Duplicate key');
        } else {
          assets.javascript[chunk] = `/${chunk}.js`;
        }
      });
    }

    return (
      <html lang={head.htmlAttributes.toComponent().lang}>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]}
              key={key} // eslint-disable-line
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss +
            it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load
            in development mode. */}
          {/* ideally one could also include here the style
            for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('containers/App/App.less')._style }} /> : null }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet="UTF-8" />
          {Object.keys(assets.javascript).reverse().map((script, key) =>
            <script
              key={key} // eslint-disable-line
              src={assets.javascript[script]}
              charSet="UTF-8"
            />
          )}
        </body>
      </html>
    );
  }
}
