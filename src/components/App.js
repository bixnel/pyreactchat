import React, { Component } from "react";
import ReactTooltip from 'react-tooltip'
import '../styles/App.css';



class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {latency: 0};
    this.timer = this.timer.bind(this);
    this.timer();
    setInterval(this.timer, 5000);
  }

  timer() {
    const start = new Date().getTime();
    fetch('http://localhost:3333/')
      .then(
        (response) => {
          if (response.status == 200) {
            const end = new Date().getTime();
            const latency = end - start;
            this.setState({latency: latency});
            if (latency < 70) {
              this.setState({quality: 'good'});
            } else if (latency < 250) {
              this.setState({quality: 'standart'});
            } else {
              this.setState({quality: 'bad'});
            }
          }
        }
      )
  }

  render() {
    return (
      <header className="header">
        <div className="logo">
          <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=60" alt="logo" />
        </div>
        <div className="info">
          <h1 className="chatname">{this.props.chatname} <span className={`ping ${this.state.quality}`} data-tip><ReactTooltip getContent={() => (`Задержка: ${this.state.latency}мс`)} /></span></h1>
          <p className="users">{this.props.online} пользователь онлайн</p>
        </div>
      </header>
    );
  }
}


class ChatBox extends Component {
  render() {
    return (
      <section className="chatbox">
        <div className="msg from-them">Лол привет ваопварполвропрвлапролварпврпловрапловралпорвалпрвалпорлваопрлваорплваорпвлаопрлваопрлваопрлваорпл</div>
        <div className="msg from-me">Лол привет ваопварполвропрвлапролварпврпловрапловралпорвалпрвалпорлваопрлваорплваорпвлаопрлваопрлваопрлваорпл</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
        <div className="msg from-them">Лол привет</div>
        <div className="msg from-me">Добрый день</div>
      </section>
    );
  }
}


class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {inProcess: false};
    this.send = this.send.bind(this);
  }

  send() {
    console.log(this.state.inProcess);
    this.setState({inProcess: true});
    console.log(this.state.inProcess);
  }

  render() {
    return (
      <footer className="sendmessage">
        <textarea placeholder="Сообщение"></textarea>
        <div className="send">
          <svg onClick={this.send} width="25" height="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-453-185-242 295q-18 23-49 23-13 0-22-4-19-7-30.5-23.5t-11.5-36.5v-349l864-1059-1069 925-395-162q-37-14-40-55-2-40 32-59l1664-960q15-9 32-9 20 0 36 11z"/></svg>
          <p className="counter">{this.props.counter}</p>
        </div>
      </footer>
    );
  }
}


const Chat = () => (
  <main className="chat">
    <ChatHeader chatname="Chatname" online="10" />
    <ChatBox />
    <SendMessage counter="130"/>
  </main>
)


class App extends Component {
  render() {
    return (
      <Chat />
    );
  }
}


export default App;