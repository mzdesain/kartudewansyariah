const twibbonImg = document.getElementById("twibbonImg");
const inputName = document.getElementById("inputName");
const inputPosition = document.getElementById("inputPosition");
const downloadBtn = document.getElementById("downloadBtn");

function updateText() {
    document.getElementById("name").innerText = inputName.value || "Nama";
    document.getElementById("position").innerText = inputPosition.value || "Keterangan";
    downloadBtn.disabled = !(inputName.value || inputPosition.value);
}

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Gagal memuat gambar. Pastikan URL gambar mengizinkan akses cross-origin."));
    });
}

async function downloadTwibbon() {
    try {
        let img = await loadImage(twibbonImg.src);

        let CANVAS_WIDTH = img.width;
        let CANVAS_HEIGHT = img.height;

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        await document.fonts.ready;

        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";

        const nameFontSize = CANVAS_HEIGHT * 0.06;
        const positionFontSize = CANVAS_HEIGHT * 0.04;

        ctx.font = `bold ${nameFontSize}px 'Montserrat', sans-serif`;

        // **Naikkan teks lebih dekat ke garis desain twibbon**
        const nameY = CANVAS_HEIGHT - (CANVAS_HEIGHT * 0.22); // Dinaikkan dari sebelumnya
        ctx.fillText(inputName.value || "Nama", CANVAS_WIDTH / 2, nameY);

        ctx.font = `${positionFontSize}px 'Montserrat', sans-serif`;
        const positionY = nameY + (1.1 * positionFontSize); 
        ctx.fillText(inputPosition.value || "Keterangan", CANVAS_WIDTH / 2, positionY);

        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Twibbon.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert(error.message);
    }
}

