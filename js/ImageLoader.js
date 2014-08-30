function upload(file){
    if (!file || !file.type.match(/image.*/)) {
        alert("File is not an image.");
        return false;
    }

    this.image = new Image();

    this.image.src = URL.createObjectURL(file);

    return this.image;
}
