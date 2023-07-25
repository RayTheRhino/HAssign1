const uploadImageBtn = document.getElementById('upload-image');
const imgContainer = document.querySelector('.img-container');
const container = document.querySelector('.container');

let lastUploadedImg = null;

uploadImageBtn.addEventListener('change', (event) => {
    const files = event.target.files;
    for (const file of files) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.classList.add('uploaded-image');

        const randomX = Math.floor(Math.random() * (container.clientWidth - 100));
        const randomY = Math.floor(Math.random() * (container.clientHeight - 100));

        img.style.left = `${randomX}px`;
        img.style.top = `${randomY}px`;
        img.rotationAngle = 0;
        img.addEventListener('click', () => {
            lastUploadedImg = img;
        });

        imgContainer.appendChild(img);
    }
});

const rotateLeftBtn = document.getElementById('rotate-left');
const rotateRightBtn = document.getElementById('rotate-right');
const angleInput = document.getElementById('angle');

function applyRotation(angle, img) {
    if (img) {
        img.rotationAngle = (img.rotationAngle + angle) % 360;
        img.style.transform = `rotate(${img.rotationAngle}deg)`;
    }
}

rotateLeftBtn.addEventListener('click', () => {
    if (lastUploadedImg) {
        applyRotation(-90, lastUploadedImg);
    }
});

rotateRightBtn.addEventListener('click', () => {
    if (lastUploadedImg) {
        applyRotation(90, lastUploadedImg);
    }
});

angleInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const enteredAngle = parseFloat(angleInput.value);
        if (!isNaN(enteredAngle)) {
            const currentAngle = lastUploadedImg ? lastUploadedImg.rotationAngle : 0;
            const rotationAngle = enteredAngle - currentAngle;
            applyRotation(rotationAngle, lastUploadedImg);
        }
    }
});

function onOpenCvReady() {
    document.body.classList.add('opencv-ready');
}
