import React, {Component} from 'react';
import Cropper from 'react-cropper';
import {saveAs} from 'file-saver';
import HIRES from '../../images/hires.png';
import LOSSY from '../../images/lossy.png';
import LOSSY_V2 from '../../images/lossy_v2.png';
import '../../lib/blur_rect';
export default class CoverGenerator extends Component {
    componentDidMount() {
        this.state = {
            hires: false,
            v2: true
        };
        this.initCanvas();
        this.initCover();
    }
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    text = '';
    fileLoaded = false;
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
        this.cover.src = this.state.hires
            ? HIRES
            : (this.state.v2)
                ? LOSSY_V2
                : LOSSY;
    }
    onCrop = (e) => {
        this.x = e.x;
        this.y = e.y;
        this.width = e.width;
        this.height = e.height;
        this.renderCover();
    }
    handleFile = (e) => {
        if (e.target.files.length > 0) {
            var blobURL = URL.createObjectURL(e.target.files[0]);
            this.img = document.createElement('img');
            this.img.src = blobURL;
            this.cropper.reset().replace(blobURL);
            this.fileLoaded = true;
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
        ctx.font = '42px Roboto Medium';
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
        this.ctx.font = '32px Roboto Medium';
        this.ctx.fillStyle = '#2d2d2d';
        this.ctx.fillText(this.text, 14, 480);
    }
    handleChangeQuality = (hires) => {
        this.setState({
            hires
        }, () => {
            this.ctx.clearRect(0, 0, 500, 500);
            this.initCover();
        });
    }
    render() {
        return (
            <div className="flex middle-container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="cover">
                                <canvas ref={(c) => this.canvas = c} id="canvas" width="500" height="500"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <Cropper className={'cropper'} ref={(c) => this.cropper = c} aspectRatio={1} dragMode={'move'} viewMode={1} zoomable={false} guides={false} crop={this.onCrop}/>
                        </div>
                        <div className="col-sm-3">
                            <Inputs onChangeQuality={this.handleChangeQuality} onFile={this.handleFile} onText={this.handleText} onSave={this.handleSave}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileLoaded: false,
            hires: false
        };
    }
    handleFile = (e) => {
        if (e.target.files.length > 0) {
            this.setState({fileLoaded: true});
            this.props.onFile(e);
        }
    }
    handleChangeQuality = () => {
        this.setState({
            hires: !this.state.hires
        });
        this.props.onChangeQuality(!this.state.hires);
    }
    handleText = (e) => {
        this.props.onText(e);
    }
    handleSave = () => {
        this.props.onSave();
    }
    render() {
        return (
            <div className="output">
                <div className="input-group">
                    <div className="input-group-addon" id="basic-addon2">
                        <input type="checkbox" value={this.state.hires} onChange={this.handleChangeQuality}/> {' HIRES'}
                    </div>
                    <input type="file" id="file" className="form-control" aria-describedby="basic-addon2" onChange={this.handleFile}/>
                    <span className="input-group-addon" id="basic-addon2">Обложка</span>
                </div>
                <div className="input-group">
                    <input type="text" id="name" placeholder="Укажите тип" className="form-control" aria-describedby="basic-addon2" disabled={!this.state.fileLoaded} onChange={this.handleText}/>
                    <span className="input-group-addon" id="basic-addon2">Тип альбома</span>
                </div>
                <button id="save" type="button" className="btn btn-secondary btn-block" disabled={!this.state.fileLoaded} onClick={this.handleSave}>Сохранить</button>
            </div>
        );
    }
};
