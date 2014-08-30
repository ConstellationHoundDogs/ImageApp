function ImageProcessor(canvas){
    this.imageMaxWidth = 600;
    this.imageMaxHeight = 600;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.img = null;
}

var p = ImageProcessor.prototype;

p.setImage = function(img){

    var ratio = 1;
    if(img.width > this.imageMaxWidth){
        ratio = this.imageMaxWidth / img.width;
    }else if(img.height > this.imageMaxHeight){
        ratio = this.imageMaxHeight / img.height;
    }

    this.canvas.width = img.width * ratio;
    this.canvas.height = img.height * ratio;
    this.img = img;

};


p.updateCanvas = function(){
    if(this.img != null){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    }
};

p.turnUpsideDownImage = function(){
    if(this.img != null){
        this.ctx.translate(0, this.canvas.height);
        this.ctx.scale(1, -1);
        this.updateCanvas();
    }
};

p.mirrorImage = function(){
    if(this.img != null){
        this.ctx.translate(this.canvas.width, 0);
        this.ctx.scale(-1, 1);
        this.updateCanvas();
    }
};

p.greyScale = function(){
    if(this.img != null){
        var imgPixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        for(var y = 0; y < imgPixels.height; y++){
            for(var x = 0; x < imgPixels.width; x++){
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i]     = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }
        this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

        this.img.src = this.canvas.toDataURL();
    }
};


//crop function takes actual non-relative coordinates
p.crop = function(x0, y0, x1, y1){
    if(this.img != null){
        var width = x1 - x0;    //relative width and height
        var height = y1 - y0;

        if(width < 0){
            width = Math.abs(width);
            x0 -= width;
        }

        if(height < 0){
            height = Math.abs(height);
            y0 -= height;
        }

        var imgPixels = this.ctx.getImageData(x0, y0, width, height);

        this.canvas.width  = width;
        this.canvas.height = height;

        this.ctx.putImageData(imgPixels, 0, 0, 0, 0, width, height);
        this.img.src = this.canvas.toDataURL();
    }
};