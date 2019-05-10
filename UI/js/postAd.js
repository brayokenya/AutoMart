const addImageBtn = document.querySelector('#add-image-btn');
const fileUploadBtn = document.querySelector('#file-upload-btn');
const postAdBtn = document.querySelector('#post-ad-btn');
const imagePreview = document.querySelector('#image-preview');

addImageBtn.addEventListener('click', () => {
    fileUploadBtn.click();
});

postAdBtn.addEventListener('click', () => {
    const selectedFiles = fileUploadBtn.files[0];
    console.log(selectedFiles);
});

fileUploadBtn.addEventListener('change', () => {
    const uploadedImage = fileUploadBtn.files[0];
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
        imagePreview.src = fileReader.result;
        addImageBtn.innerHTML = 'change image';
    });

    fileReader.readAsDataURL(uploadedImage);

});
