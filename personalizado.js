const uploadInput = document.getElementById('upload');
const uploadedImage = document.getElementById('uploaded-image');
const container = document.getElementById('image-container');
let isDragging = false; // Controle de estado de arrasto
let offsetX, offsetY;

// Função para carregar a imagem e validar o formato PNG
uploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === "image/png") { // Valida o formato PNG
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = "block"; // Mostra a imagem carregada
            uploadedImage.style.left = "0px"; // Reseta a posição ao fazer novo upload
            uploadedImage.style.top = "0px";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Por favor, envie uma imagem em formato PNG.");
    }
});

// Função para iniciar o arrasto
uploadedImage.addEventListener('mousedown', function(event) {
    isDragging = true;
    const rect = uploadedImage.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
});

// Função para arrastar a imagem
document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const rect = container.getBoundingClientRect();
        let newX = event.clientX - rect.left - offsetX;
        let newY = event.clientY - rect.top - offsetY;

        // Restringe a imagem para dentro do container
        newX = Math.max(0, Math.min(newX, rect.width - uploadedImage.width));
        newY = Math.max(0, Math.min(newY, rect.height - uploadedImage.height));

        uploadedImage.style.left = `${newX}px`;
        uploadedImage.style.top = `${newY}px`;
    }
});

// Função para finalizar o arrasto
document.addEventListener('mouseup', function() {
    isDragging = false;
});
