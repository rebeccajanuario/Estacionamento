// Lista para armazenar os carros registrados, incluindo data de registro e saída
let carList = [];
// Lista para armazenar os carros removidos
let removedCarsList = [];

// Função para formatar a data no formato dd/mm/yy h:m
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Obtém os dois últimos dígitos do ano
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Função para exibir os carros na lista
function displayCarList() {
    console.log("Exibindo lista de carros...");
    const carListElement = document.getElementById('car-list');
    carListElement.innerHTML = ''; // Limpa a lista

    // Adiciona cada carro na lista
    carList.forEach((car, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `Placa: ${car.plate}, Registrado em: ${car.registrationDate}, Saída: ${car.exitDate || 'Ainda no estacionamento'}`;
        
        // Botão de remoção
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'ms-2');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => removeCar(index);
        
        listItem.appendChild(removeBtn);
        carListElement.appendChild(listItem);
    });
}

// Função para exibir as placas removidas
function displayRemovedPlates() {
    console.log("Exibindo placas removidas...");
    const removedPlatesElement = document.getElementById('removed-plates-list');
    removedPlatesElement.innerHTML = ''; // Limpa a lista de placas removidas

    // Adiciona cada placa removida na nova área
    removedCarsList.forEach((car) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `Placa: ${car.plate}, Removido em: ${car.exitDate}`;
        removedPlatesElement.appendChild(listItem);
    });
}

// Função para adicionar um carro
function addCar() {
    const plateInput = document.getElementById('license-plate');
    const plate = plateInput.value.trim();
    
    console.log("Tentando adicionar placa:", plate); // Verificando a placa inserida

    // Verifica se a placa não está vazia
    if (plate === '') {
        alert('Por favor, insira a placa do carro.');
        return;
    }

    // Cria o objeto de carro com placa e data de registro
    const registrationDate = formatDate(new Date()); // Data de registro
    const car = {
        plate: plate,
        registrationDate: registrationDate,
        exitDate: '' // Inicialmente sem data de saída
    };

    // Adiciona o carro na lista
    carList.push(car);
    
    // Exibe a lista de carros e placas adicionadas
    displayCarList();
    
    // Limpa o campo de entrada
    plateInput.value = '';
}

// Função para remover um carro
function removeCar(index) {
    console.log("Removendo carro na posição:", index); // Verificando a remoção
    
    // Define a data de saída do carro
    const exitDate = formatDate(new Date());
    carList[index].exitDate = exitDate;
    
    // Adiciona o carro à lista de removidos
    removedCarsList.push(carList[index]);
    
    // Remove o carro da lista principal
    carList.splice(index, 1);
    
    // Exibe a lista de carros e placas atualizadas
    displayCarList();
    displayRemovedPlates();
}

// Adiciona o evento de clique no botão "Gerar Registro"
document.getElementById('generate-car-btn').addEventListener('click', addCar);

// Exibe a lista de carros ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada, exibindo lista de carros...");
    displayCarList();
    displayRemovedPlates();  // Exibe as placas removidas logo ao carregar
});

// Função para atualizar a tarifa
function updateTariff() {
    const newTariff = document.getElementById('tariff').value;
    console.log("Nova tarifa: ", newTariff);
    // Você pode aqui fazer a lógica para atualizar a tarifa, como salvar no banco de dados ou localStorage
}
