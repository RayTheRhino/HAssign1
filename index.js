const uploadImageBtn = document.getElementById('upload-image');
const imgContainer = document.querySelector('.img-container');
const container = document.querySelector('.container');

let lastUploadedImg = null;
let rotationAngle = 0;

uploadImageBtn.addEventListener('change', (event) => {
    const files = event.target.files;
    for (const file of files) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.classList.add('uploaded-image');

        const randomX = Math.floor(Math.random() * (container.clientWidth - 100));
        const randomY = Math.floor(Math.random() * (container.clientHeight - 100));

        img.style.left = `${randomX}px`; //horizantal position for left edge
        img.style.top = `${randomY}px`; //vertical position for top edge

        if (lastUploadedImg) {
            img.style.transform = `rotate(${lastUploadedImg.rotationAngle}deg)`;
        }

        imgContainer.appendChild(img);
        lastUploadedImg = img;
        lastUploadedImg.rotationAngle = 0;
    }
});

const rotateLeftBtn = document.getElementById('rotate-left');
const rotateRightBtn = document.getElementById('rotate-right');
const angleInput = document.getElementById('angle');

function applyRotation(angle) {
    if (lastUploadedImg) {
        lastUploadedImg.rotationAngle = angle;
        lastUploadedImg.style.transform = `rotate(${angle}deg)`;
    }
}

rotateLeftBtn.addEventListener('click', () => {
    if (lastUploadedImg) {
        rotationAngle -= 90;
        applyRotation(rotationAngle);
    }
});

rotateRightBtn.addEventListener('click', () => {
    if (lastUploadedImg) {
        rotationAngle += 90;
        applyRotation(rotationAngle);
    }
});

angleInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const enteredAngle = parseFloat(angleInput.value);
        if (!isNaN(enteredAngle)) {
            rotationAngle = enteredAngle;
            applyRotation(rotationAngle);
        }
    }
});

function onOpenCvReady() {
    document.body.classList.add('opencv-ready');
}
