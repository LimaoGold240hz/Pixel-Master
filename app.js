const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const colorButtons = document.querySelectorAll('.color-btn');
const purchaseHistory = document.getElementById('purchaseHistory');

canvas.width = 800;
canvas.height = 800;

const pixelSize = 50; // Tamanho do pixel
const rows = canvas.height / pixelSize;
const cols = canvas.width / pixelSize;

let selectedColor = colorPicker.value;

function drawGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.strokeStyle = "#ddd";
            ctx.strokeRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
        }
    }
}

drawGrid();

// Funcionalidade de escolher cor predefinida
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.getAttribute('data-color');
        colorPicker.value = selectedColor; // Atualiza o color picker com a cor selecionada
    });
});

// Colorir pixel
canvas.addEventListener('click', (e) => {
    const x = Math.floor(e.offsetX / pixelSize);
    const y = Math.floor(e.offsetY / pixelSize);

    ctx.fillStyle = selectedColor;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

    console.log(`Pixel at (${x}, ${y}) colored with ${selectedColor}`);

    // Dados da transação para o backend
    const transactionData = {
        sender: 'user1',
        recipient: 'blockchain',
        amount: 1,
        color: selectedColor,
    };

    fetch('http://127.0.0.1:5000/transactions/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
    })
        .then(response => response.json())
        .then(result => {
            console.log('Transaction result:', result);
            // Adicionar à lista de histórico de compras
            const listItem = document.createElement('li');
            listItem.textContent = `Pixel colorido com ${selectedColor}`;
            purchaseHistory.appendChild(listItem);
        })
        .catch(error => console.error('Error sending transaction:', error));
});
