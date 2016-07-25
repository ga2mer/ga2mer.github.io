import React, {Component} from 'react';
import cx from 'classnames';
import fetchJsonp from 'fetch-jsonp';
import VKError from '../../lib/VKError';
export default class Graffiti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            tokenValid: false,
            url: '',
            info: {
                type: '',
                message: ''
            }
        };
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return response.json().then((json) => {
                var message;
                if (json.message) {
                    message = json.message == 'File too large' && 'Размер файла превышает 4мб' || json.message;
                } else if (json.error && json.error.error_code) {
                    return Promise.reject(new VKError(json.error.error_msg, json.error.error_code));
                }
                return Promise.reject(new Error(message));
            });
        }
    }
    checkStatusP(response) {
        return response.json().then((json) => {
            if (json.response) {
                return response;
            } else if (json.error && json.error.error_code) {
                return Promise.reject(new VKError(json.error.error_msg, json.error.error_code));
            } else if (json.error) {
                return Promise.reject(new Error(json.error.error_msg));
            }
        });
    }
    parseJSON = (response) => response.json()
    handleGetToken() {
        window.open('https://oauth.vk.com/authorize?client_id=5553668&scope=docs&response_type=token');
    }
    handleChangeToken = (e) => {
        this.setState({
            token: e.target.value,
            tokenValid: /access_token=(.+)&expires_in/.test(e.target.value)
        });
    }
    handleURL = (e) => {
        this.setState({url: e.target.value});
    }
    setInfo = (type, message) => {
        this.setState({
            info: {
                type,
                message
            }
        });
    }
    handleLink = () => {
        this.setInfo('', '');
        const tokenEl = this.state.token;
        const fileEl = this.file;
        if (fileEl.files.length == 0 && this.state.url.length == 0) {
            this.setInfo('error', 'Не выбран файл или не заполнено поле юрл');
            return false;
        }
        const [,
            token] = /access_token=(.+)&expires_in/.exec(tokenEl);
        var fd = new FormData();
        fd.append('file', fileEl.files[0]);
        var regexHttps = /pu\.vk\.com\/c(\d+)\/upload\.php\?act=add_doc&mid=(\d+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)&api=1/i;
        var regexHttp = /cs(\d+)\.vk\.com\/upload\.php\?act=add_doc&mid=(\d+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)/i;
        this.setInfo('message', 'Загрузка изображения, подождите');
        fetchJsonp(`https://api.vk.com/method/docs.getUploadServer?v=5.54&access_token=${token}&type=graffiti`).then(this.checkStatusP).then(this.parseJSON).then((uploadServer) => {
            var isHTTPS = regexHttps.test(uploadServer.response.upload_url);
            var regex = isHTTPS && regexHttps || regexHttp;
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
            var link = `https://vk.com/doc${doc.owner_id}_${doc.id}`;
            this.setInfo('link', link);
        }).catch((err) => {
            if (err instanceof VKError) {
                return this.setInfo('error', err.message);
            }
            this.setInfo('error', err.message);
        });
    }
    handleClearFile = () => {
        this.file.value = '';
    }
    handleSelectAll(e) {
        e.target.setSelectionRange(0, e.target.value.length);
    }
    handleCopyLink = () => {
        this.linkInput.select();
        document.execCommand('Copy');
    }
    render() {
        return (
            <div className={'container middle-container'}>
                <div className={'container center-text'} style={{
                    maxWidth: '450px'
                }}>
                    Здесь когда-нибудь будет описание
                    <form>
                        <label htmlFor={'token'}>Адрес с access_token</label>
                        <div className={'input-group'}>
                            <input id={'token'} type='text' className={'form-control sharp'} value={this.state.token} onChange={this.handleChangeToken} placeholder={'https://oauth.vk.com/blank...'}/>
                            <span className='input-group-btn'>
                                <button className='btn btn-primary sharp' type='button' onClick={this.handleGetToken}>Получить</button>
                            </span>
                        </div>
                        <label htmlFor={'file'}>Изображение в формате: png, jpg или gif</label>
                        <div className={'input-group'}>
                            <input id={'file'} className={'form-control sharp'} disabled={!this.state.tokenValid || this.state.url.length > 0} ref={(c) => this.file = c} type={'file'}/>
                            <span className={'input-group-btn'}>
                                <button className='btn btn-primary sharp' type='button' disabled={!this.state.tokenValid || this.state.url.length > 0} onClick={this.handleClearFile}>Очистить</button>
                            </span>
                        </div>
                        <div className={'strike'}>
                            <span>
                                или ссылку на изображение
                            </span>
                        </div>
                        <input className={'form-control sharp'} disabled={!this.state.tokenValid} type='text' value={this.state.url} onChange={this.handleURL} placeholder={'e.g. http://i.imgur.com/cPuty2U.png'}/>
                        <div className={'divider'}/>
                        <div>
                            <button className='btn btn-secondary sharp' type='button' disabled={!this.state.tokenValid} onClick={this.handleLink}>Получить ссылку</button>
                        </div>
                        {this.state.info.type && <div className={'divider'}/>}
                        {this.state.info.type && <div className={cx({
                            alert: true,
                            'alert-danger': this.state.info.type == 'error',
                            'alert-info': this.state.info.type == 'message',
                            'alert-success': this.state.info.type == 'link'
                        })} role="alert">
                            {(() => {
                                if (this.state.info.type == 'link') {
                                    return (
                                        <div className={'input-group'}>
                                            <input type='text' ref={(c) => this.linkInput = c} className={'form-control sharp'} readOnly onClick={this.handleSelectAll} defaultValue={this.state.info.message}/>
                                            <span className='input-group-btn'>
                                                <button className='btn btn-primary sharp' type='button' onClick={this.handleCopyLink}>Скопировать</button>
                                            </span>
                                        </div>
                                    );
                                } else {
                                    return this.state.info.message;
                                }
                            })()}
                        </div>}
                    </form>
                </div>
            </div>
        );
    }
}
