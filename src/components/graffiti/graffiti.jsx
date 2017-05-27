import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import VKError from '../../lib/VKError';
import { Row, Form, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
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
        this.setState({ url: e.target.value });
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
        var regexHttps = /pu\.vk\.com\/c(\d+)\/upload\.php\?act=add_doc&mid=(\d+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)&api=1/i;
        var regexHttp = /cs(\d+)\.vk\.com\/upload\.php\?act=add_doc&mid=(\d+)&aid=0&gid=0&type=graffiti&hash=([a-z0-9]+)&rhash=([a-z0-9]+)/i;
        this.setInfo('info', 'Загрузка изображения, подождите');
        fetchJsonp(`https://api.vk.com/method/docs.getUploadServer?v=5.54&access_token=${token}&type=graffiti`).then(this.checkStatusP).then(this.parseJSON).then((uploadServer) => {
            var isHTTPS = regexHttps.test(uploadServer.response.upload_url);
            var regex = isHTTPS && regexHttps || regexHttp;
            var [,
                c,
                mid,
                hash,
                rhash] = regex.exec(uploadServer.response.upload_url);
            fd.append('c', c);
            fd.append('mid', mid);
            fd.append('hash', hash);
            fd.append('rhash', rhash);
            if (fileEl.files.length > 0) {
                fd.append('file', fileEl.files[0]);
                return fetch('https://ga2mer.cf/vkgraffiti/upload_by_file', {
                    method: 'POST',
                    body: fd
                }).then(this.checkStatus).then(this.parseJSON);
            } else if (this.state.url) {
                fd.append('url', this.state.url);
                return fetch('https://ga2mer.cf/vkgraffiti/upload_by_url', { body: fd, method: 'POST' }).then(this.checkStatus).then(this.parseJSON);
            }
        }).then((responseFile) => fetchJsonp(`https://api.vk.com/method/docs.save?v=5.54&access_token=${token}&file=${responseFile.file}`).then(this.parseJSON)).then((responseDoc) => {
            var doc = responseDoc.response[0];
            var link = `https://vk.com/doc${doc.owner_id}_${doc.id}`;
            this.setInfo('success', link);
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
    renderAlert = () => {
        if (this.state.info.type == 'success') {
            return (
                <FormItem>
                    <InputGroup>
                        <Input style={{ width: '64%' }} type='text' ref={(c) => c ? this.linkInput = c.refs.input : null} className={'field sharp'} readOnly onClick={this.handleSelectAll} defaultValue={this.state.info.message} />
                        <Button type={'primary'} size={'large'} className={'button-left-sharp'} onClick={this.handleCopyLink}>Скопировать</Button>
                    </InputGroup>
                </FormItem>
            );
        } else {
            return <div className={'text-center'}>{this.state.info.message}</div>;
        }
    }
    renderLabelText = (text) => <div className={'text-center'}>{text}</div>
    render() {
        return (
            <Row type={'flex'} justify={'center'} align={'middle'} style={{
                minHeight: '100vh'
            }}>
                <div>
                    <div className={'text-center'}>Здесь когда-нибудь будет описание</div>
                    <div>
                        <Form layout={'vertical'} className={'form-nopadding'}>
                            <FormItem label={this.renderLabelText('Адрес с access_token')}>
                                <InputGroup>
                                    <Input style={{ width: '70%' }} type='text' className={'field'} value={this.state.token} onChange={this.handleChangeToken} placeholder={'https://oauth.vk.com/blank...'} />
                                    <Button type={'primary'} size={'large'} className={'button-left-sharp'} onClick={this.handleGetToken}>Получить</Button>
                                </InputGroup>
                            </FormItem>
                            <FormItem label={this.renderLabelText('Изображение в формате: png, jpg или gif')}>
                                <InputGroup>
                                    <Input style={{ width: '70%', height: '100%' }} id={'file'} className={'field'} disabled={!this.state.tokenValid || this.state.url.length > 0} ref={(c) => c ? this.file = c.refs.input : null} type={'file'} />
                                    <Button type={'primary'} size={'large'} className={'button-left-sharp wat'} disabled={!this.state.tokenValid || this.state.url.length > 0} onClick={this.handleClearFile}>Очистить</Button>
                                </InputGroup>
                            </FormItem>
                            <div className={'strike'}>
                                <span>
                                    или ссылку на изображение
                                </span>
                            </div>
                            <FormItem>
                                <Input className={'sharp'} disabled={!this.state.tokenValid} type='text' value={this.state.url} onChange={this.handleURL} placeholder={'e.g. http://i.imgur.com/cPuty2U.png'} />
                            </FormItem>
                            <div className={'divider'} />
                            <Row type={'flex'} justify={'center'}>
                                <Button disabled={!this.state.tokenValid} onClick={this.handleLink}>Получить ссылку</Button>
                            </Row>
                            {this.state.info.type && <div className={'divider'} />}
                            {this.state.info.type && <Alert className={'alert-center'} message={this.renderAlert()} type={this.state.info.type} />}
                        </Form>
                    </div>
                </div>
            </Row>
        );
    }
}
