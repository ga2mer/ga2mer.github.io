import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
export default class Graffiti extends Component {
    constructor() {
        super();
        this.state = {
            token: ''
        };
        this.handleToken = this.handleToken.bind(this);
        this.handleLink = this.handleLink.bind(this);
    }
    parseJSON(response) {
        return response.json()
    }
    handleGetToken() {
        window.open("https://oauth.vk.com/authorize?client_id=5553668&scope=docs&response_type=token");
    }
    handleToken(e) {
        this.setState({token: e.target.value});
    }
    handleLink() {
        const tokenEl = this.state.token;
        const fileEl = this.refs.file;
        const [,
            token] = /access_token=(.+)&expires_in/.exec(tokenEl);
        var fd = new FormData();
        fd.append('file', fileEl.files[0]);
        fetchJsonp(`https://api.vk.com/method/docs.getUploadServer?v=5.54&access_token=${token}&type=graffiti`).then(this.parseJSON).then((uploadServer) => {
            this.refs.link.innerHTML = `Загрузка изображения долгая, подождите`;
            return fetch(`https://cors-anywhere.herokuapp.com/${uploadServer.response.upload_url}&type=graffiti`, {
                method: 'POST',
                body: fd
            }).then(this.parseJSON);
        }).then((responseFile) => fetchJsonp(`https://api.vk.com/method/docs.save?v=5.54&access_token=${token}&file=${responseFile.file}`).then(this.parseJSON)).then((responseDoc) => {
            var doc = responseDoc.response[0];
            var link = `https://vk.com/doc${doc.owner_id}_${doc.id}`
            this.refs.link.innerHTML = `<a href="${link}">${link}</a>`;
        });
    }
    render(props, state) {
        return (
            <div id="graffiti">
                <button onClick={this.handleGetToken}>Получить токен</button>
                <div>Вставьте полностью весь юрл</div>
                <input type="text" id="token" value={state.token} onKeyUp={this.handleToken}/>
                <div>Укажите .png</div>
                <input ref={"file"} type={"file"}/>
                <div>
                    <button onClick={this.handleLink}>Получить ссылку</button>
                </div>
                <div ref={"link"}>{state.message}</div>
            </div>
        );
    }
}
