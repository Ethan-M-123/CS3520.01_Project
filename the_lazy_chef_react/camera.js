/**
 * Our group found this camera function on a StackOverflow reply by user Dalibor.
 * We modified it to fit our needs.
 * Adapted from: Dalibor--Reply to "How can I take a picture in React web application (not native)"
 * URL: https://stackoverflow.com/questions/58806971/how-can-i-take-a-picture-in-react-web-application-not-native
 * Retrieved: 5/11/2021
 */

// sets up webcam video feed and contains functions for video feed
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
                    navigator.mediaDevices.getUserMedia({ video: 'true' }).then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    });
                })(this.video)
    
            }
        },
    
        // pauses video feed
        takeSnapshot: function () {
            this.video.pause();
        },

        // gets video feed height
        videoElement: function() {
            return this.video;
        },

        // get canvas context
        getCtx: function(){
            return this.canvas.getContext('2d');
        }
    
    }
    }();
    
    // export camera
    export default camera;