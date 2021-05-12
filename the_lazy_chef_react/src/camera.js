// import { constraints } from "@tensorflow/tfjs-layers";

const camera = function () {
    let width = 0;
    let height = 0;
    
    const createObjects = function () {
    
        console.log(document.getElementsByTagName('body'))
        const video = document.createElement('video');
        video.id = 'video';
        video.width = width;
        video.height = height;
        video.autoplay = true;
        document.body.appendChild(video);
    
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        
    }
    
    
    return {
        video: null,
        context: null,
        canvas: null,
    
        startCamera: function (w = 680, h = 480) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                width = w;
                height = h;
    
                createObjects();
    
                this.video = document.getElementById('video');
                this.canvas = document.getElementById('canvas');
                this.context = this.canvas.getContext('2d');
    
    
                (function (video) {
                    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } }).then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    });
                })(this.video)
    
            }
        },
    
        takeSnapshot: function () {
            // this.canvas.width = width;
            // this.canvas.height = height;
            // this.context.drawImage(this.video, 0, 0, width, height);
            this.video.pause()
        },

        videoElement: function() {
            console.log(this.video.height)
            return this.video
        },

        getCtx: function(){
            return this.canvas.getContext('2d');
        }
    
    }
    }();
    
    export default camera;