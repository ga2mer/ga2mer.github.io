import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { saveAs } from 'file-saver';
import '../../lib/letterSpacing';
import { Row, Col, Form, Input, Button } from 'antd';
const FormItem = Form.Item;

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="102" height="120"> 
<path 
id="Aki-Logo" 
fill-rule="evenodd" 
fill="#fff" 
d="M1310,210L1258.75,90h-17L1293,210h17Zm-33.25-21.909-18.5,7.22-50.25-24.9,20-46.8,17.25-5.975-18.5,47.3Z" 
transform="translate(-1208 -90)" 
/>
</svg>`;

export default class CoverGenerator extends Component {
    componentDidMount() {
        document.fonts.load('1pt "MontserratBold"').then(document.fonts.load('1pt "MontserratSemiBold"')).then(() => {
            this.initCanvas();
            this.initCover();
        });
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
        this.logo = new Image();
        const svg = new Blob([logo], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svg);

        this.logo.onload = () => {
            this.renderCover();
            URL.revokeObjectURL(url);
        }
        this.logo.src = url;
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
        this.canvas.toBlob((blob) => {
            saveAs(blob, 'cover.png');
        });
    }
    renderCover() {
        this.ctx.clearRect(0, 0, 800, 800);
        if (this.fileLoaded) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height, 0, 0, 800, 800);
        }
        var gradient = this.ctx.createRadialGradient(750, -100, 0, 750, -100, 500);
        gradient.addColorStop(0, 'rgb(0, 0, 0, 0.25');
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 800, 800);
        this.ctx.drawImage(this.logo, 690, 51, 59, 69);
        const musicCanvas = document.createElement('canvas');
        musicCanvas.width = 100;
        musicCanvas.height = 200;
        const musicCtx = musicCanvas.getContext('2d');
        musicCtx.clearRect(0, 0, 800, 800);
        musicCtx.rotate(67 * Math.PI / 180);
        musicCtx.font = '10pt MontserratSemiBold';
        musicCtx.fillStyle = '#fff';
        musicCtx.letterSpacing = 2,5;
        musicCtx.fillText('МУЗЫКА', 5, 0);
        this.ctx.drawImage(musicCanvas, 722, 43);
        this.ctx.font = '23pt MontserratBold';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(this.text, 663, 96);
    }
    render() {
        return (
            <Row type={'flex'} justify={'center'} align={'middle'} style={{
                minHeight: '100vh'
            }}>
                <div className='container-fluid' >
                    <Row gutter={32}>
                        <Col span={12} className={'cover'}>
                            <canvas ref={(c) => this.canvas = c} id='canvas' width='800' height='800' style={({ width: 500 })} />
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
                    <Input style={{ height: '100%' }} type='file' ref={(c) => c ? this.file = c.refs.input : null} onChange={this.handleFile} className={'sharp'} addonAfter={'Обложка'} />
                </FormItem>
                <FormItem>
                    <Input type='text' id='name' placeholder='Укажите тип' className='sharp' aria-describedby='basic-addon2' disabled={!this.state.fileLoaded} onChange={this.handleText} addonAfter={'Тип альбома'} />
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
