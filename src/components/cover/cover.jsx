import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { saveAs } from 'file-saver';
import LOSSY from '../../images/lossy_v2.png';
import '../../lib/blur_rect';
import { Row, Col, Form, Input, Button } from 'antd';
const FormItem = Form.Item;
export default class CoverGenerator extends Component {
    componentDidMount() {
        this.initCanvas();
        this.initCover();
    }
    componentWillUnmount() {
        this.blobs.forEach((item) => {
            URL.revokeObjectURL(item);
        });
    }
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    text = '';
    fileLoaded = false;
    blobs = [];
    initCanvas = () => {
        this.ctx = this.canvas.getContext('2d');
    }
    initCover = () => {
        this.cover = new Image();
        this.cover.onload = () => {
            this.ctx.drawImage(this.cover, 0, 323, 500, 177);
            if (this.fileLoaded) {
                this.renderCover();
            }
        };
        this.cover.src = LOSSY;
    }
    onCrop = (e) => {
        this.x = e.detail.x;
        this.y = e.detail.y;
        this.width = e.detail.width;
        this.height = e.detail.height;
        this.renderCover();
    }
    handleFile = (e) => {
        if (e.target.files.length > 0) {
            let blobURL = URL.createObjectURL(e.target.files[0]);
            this.blobs.push(blobURL);
            this.img = document.createElement('img');
            this.img.onload = () => {
                this.cropper.reset().replace(blobURL);
                this.fileLoaded = true;
            };
            this.img.src = blobURL;
        }
    }
    handleText = (e) => {
        this.text = e.target.value;
        this.renderCover();
    }
    handleSave = () => {
        let canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 800;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height, 0, 0, 800, 800);
        ctx._blurRect(0, 704, 616, 96, 1, 2);
        ctx._blurRect(671, 652, 129, 148, 1, 2);
        ctx.drawImage(this.cover, 0, 517, 800, 283);
        ctx.font = '42px MuseoBlack';
        ctx.fillStyle = '#2d2d2d';
        ctx.fillText(this.text, 34, 764);
        canvas.toBlob((blob) => {
            saveAs(blob, 'cover.png');
        });
    }
    renderCover() {
        this.ctx.clearRect(0, 0, 500, 500);
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height, 0, 0, 500, 500);
        this.ctx._blurRect(0, 439, 400, 61, 1, 2);
        this.ctx._blurRect(419, 404, 70, 80, 1, 2);
        this.ctx.drawImage(this.cover, 0, 323, 500, 177);
        this.ctx.font = '32px MuseoBlack';
        this.ctx.fillStyle = '#2d2d2d';
        this.ctx.fillText(this.text, 14, 480);
    }
    render() {
        return (
            <Row type={'flex'} justify={'center'} align={'middle'} style={{
                minHeight: '100vh'
            }}>
                <div className='container-fluid'>
                    <Row gutter={32}>
                        <Col span={12} className={'cover'}>
                            <canvas ref={(c) => this.canvas = c} id='canvas' width='500' height='500' />
                        </Col>
                        <Col span={12}>
                            <Cropper
                                className={'cropper'}
                                ref={(c) => this.cropper = c}
                                aspectRatio={1}
                                dragMode={'move'}
                                viewMode={1}
                                zoomable={false}
                                guides={false}
                                crop={this.onCrop} />
                        </Col>
                    </Row>
                    <Row type={'flex'} justify={'center'}>
                        <Inputs
                            onFile={this.handleFile}
                            onText={this.handleText}
                            onSave={this.handleSave} />
                    </Row>
                </div>
            </Row>
        );
    }
}

class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileLoaded: false
        };
    }
    componentDidMount() {
        this.file.addEventListener('change', this.handleFile);
    }
    handleFile = (e) => {
        if (e.target.files.length > 0) {
            this.setState({ fileLoaded: true });
            this.props.onFile(e);
        }
    }
    handleText = (e) => {
        this.props.onText(e);
    }
    handleSave = () => {
        this.props.onSave();
    }
    render() {
        return (
            <Form className='output form-cover'>
                <FormItem>
                    <Input style={{ height: '100%' }} type='file' ref={(c) => c ? this.file = c.refs.input : null} className={'sharp'} addonAfter={'Обложка'}/>
                </FormItem>
                <FormItem>
                    <Input type='text' id='name' placeholder='Укажите тип' className='sharp' aria-describedby='basic-addon2' disabled={!this.state.fileLoaded} onChange={this.handleText} addonAfter={'Тип альбома'}/>
                </FormItem>
                <FormItem>
                    <Row type={'flex'} justify={'center'}>
                        <Button disabled={!this.state.fileLoaded} onClick={this.handleSave}>Сохранить</Button>
                    </Row>
                </FormItem>
            </Form>
        );
    }
};
