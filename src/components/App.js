import React, { Component } from "react";
import ReactTooltip from 'react-tooltip'
import '../styles/App.css';



class Latency extends Component {
  constructor(props) {
    super(props);
    this.state = {latency: 0};
  }

  timer() {
    const start = new Date().getTime();
    fetch("https://ya.ru", {mode: 'cors'})
      .then(
        (response) => {
          if (response.status == 200) {
            const end = new Date().getTime();
            this.setState({latency: end - start});
          }
        }
      )
    console.log(end - start);
  }

  render() {
    return (
        <span className="ping good" data-tip="Latency: ${this.state.latency}ms"><ReactTooltip /></span>
    );
  }

  componentDidMount() {
    setInterval(this.timer, 1000);
  }
}


const ChatHeader = (props) => (
  <header className="header">
    <div className="logo">
      <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=60" alt="logo" />
    </div>
    <div className="info">
      <h1 className="chatname">{props.chatname} <Latency /></h1>
      <p className="users">{props.online} пользователь онлайн</p>
    </div>
  </header>
)


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
