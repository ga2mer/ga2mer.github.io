import React, {Component} from 'react';
import fetchJsonp from 'fetch-jsonp';
export default class Graffiti extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            url: '',
            error: '',
            link: '',
            message: ''
        };
        this.handleToken = this.handleToken.bind(this);
        this.handleURL = this.handleURL.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.parseJSON = this.parseJSON.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return response.json().then((json) => {
                var message;
                if (json.message) {
                    message = json.message == 'File too large' && 'Размер файла превышает 4мб' || json.message;
                } else if (json.error && json.error.error_code == 5) {
                    message = 'Токен неправильный или устарел';
                }
                return Promise.reject(new Error(message));
            });
        }
    }
    checkStatusP(response) {
        return response.json().then((json) => {
            if (json.response) {
                return response;
            } else if (json.error && json.error.error_code == 5) {
                var message = 'Токен неправильный или устарел';
                return Promise.reject(new Error(message));
            }
        });
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
    handleURL(e) {
        this.setState({url: e.target.value});
    }
    handleLink() {
        this.setState({error: '', message: '', link: ''});
        const tokenEl = this.state.token;
        const fileEl = this.refs.file;
        if (!/access_token=(.+)&expires_in/.exec(tokenEl)) {
            this.setState({error: 'Неправильный юрл токена'});
            return false;
        }
        if (fileEl.files.length == 0 && this.state.url.length == 0) {
            this.setState({error: 'Не выбран файл или не заполнено поле юрл'});
            return false;
        }
        const [,
            token] = /access_token=(.+)&expires_in/.exec(tokenEl);
        var fd = new FormData();
        fd.append('file', fileEl.files[0]);
        var regex = /pu\.vk\.com\/([a-z0-9]+)\/upload\.php\?act=add_doc&mid=([0-9]+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)&api=1/i;
        fetchJsonp(`https://api.vk.com/method/docs.getUploadServer?v=5.54&access_token=${token}&type=graffiti`).then(this.checkStatusP).then(this.parseJSON).then((uploadServer) => {
            this.setState({message: 'Загрузка изображения, подождите'});
            var [,
                c,
                mid,
                hash,
                rhash] = regex.exec(uploadServer.response.upload_url);
            if (fileEl.files.length > 0) {
                return fetch(`https://akigami.ru/vkgraffiti/upload_by_file?c=${c}&mid=${mid}&hash=${hash}&rhash=${rhash}`, {
                    method: 'POST',
                    body: fd
                }).then(this.checkStatus).then(this.parseJSON);
            } else if (this.state.url) {
                return fetch(`https://akigami.ru/vkgraffiti/upload_by_url?url=${this.state.url}&c=${c}&mid=${mid}&hash=${hash}&rhash=${rhash}`, {method: 'POST'}).then(this.checkStatus).then(this.parseJSON);
            }
        }).then((responseFile) => fetchJsonp(`https://api.vk.com/method/docs.save?v=5.54&access_token=${token}&file=${responseFile.file}`).then(this.parseJSON)).then((responseDoc) => {
            var doc = responseDoc.response[0];
            var link = `https://vk.com/doc${doc.owner_id}_${doc.id}`
            this.setState({link: link, err: '', message: ''});
        }).catch(err => {
            this.setState({error: err.message, link: '', message: ''});
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
                <div>или ссылку на изображение</div>
                <input type="text" value={state.url} onKeyUp={this.handleURL}/>
                <div>
                    <button onClick={this.handleLink}>Получить ссылку</button>
                </div>
                {state.error && <div>{state.error}</div>}
                {state.message && <div>{state.message}</div>}
                {state.link && <div>
                    <a href={state.link}>{state.link}</a>
                </div>}
            </div>
        );
    }
}
