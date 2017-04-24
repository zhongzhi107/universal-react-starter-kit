import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Chat extends Component {
  static propTypes = {
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    if (typeof socket === 'object') {
      socket.on('msg', this.onMessageReceived);
    }
  }

  componentWillUnmount() {
    if (typeof socket === 'object') {
      socket.removeListener('msg', this.onMessageReceived);
    }
  }

  onMessageReceived = (data) => {
    console.log(`Message from socket server: ${JSON.stringify(data)}`);
    const messages = this.state.messages;
    messages.push(data);
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="container">
        <Helmet title="Chat" />
        <h1>Websocket Test</h1>
        <h2>Features in this page:</h2>
        <ul>
          <li>Transfer data with socket</li>
        </ul>
        <p>You can disable socket by modifying the configuration file: ` src/config/app.js `</p>
        {
          messages.length > 0 &&
          <div>
            <h2>Messages from socket server:</h2>
            <ul>
              {
                this.state.messages.map(
                  msg => <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>
                )
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}


// if (__DEVELOPMENT__ && module.hot) {
//   module.hot.accept('./index.js', () => {
//     console.log('-------src/containers/Chat/index.js');
//   });
// }
