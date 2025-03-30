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

        // Menggunakan ukuran asli gambar
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

        // Menyesuaikan ukuran font berdasarkan lebar canvas
        const nameFontSize = CANVAS_WIDTH * 0.03;
        const positionFontSize = CANVAS_WIDTH * 0.02;
        
        ctx.font = `bold ${nameFontSize}px 'Montserrat', sans-serif`;
        const nameY = CANVAS_HEIGHT - (CANVAS_HEIGHT * 0.16);
        ctx.fillText(inputName.value || "Nama", CANVAS_WIDTH / 2, nameY);

        ctx.font = `${positionFontSize}px 'Montserrat', sans-serif`; // Font reguler
        const positionY = nameY + (1.1 * positionFontSize); // Jarak antara nama dan keterangan = 1.1x ukuran font keterangan
        ctx.fillText(inputPosition.value || "Keterangan", CANVAS_WIDTH / 2, positionY);

        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Kartu ID Dewan Syariah WI.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert(error.message);
    }
}
