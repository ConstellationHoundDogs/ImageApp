function upload(file){
    if (!file || !file.type.match(/image.*/)) {
        alert("File is not an image.");
        return false;
    }

    var image = new Image();

    image.src = URL.createObjectURL(file);

    return image;
}
