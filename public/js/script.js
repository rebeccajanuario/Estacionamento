// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl-lD-fRu11LNzMG3zG-mDTdxHpiJstsI",
    authDomain: "estacionamento-6cd30.firebaseapp.com",
    databaseURL: "https://estacionamento-6cd30-default-rtdb.firebaseio.com",
    projectId: "estacionamento-6cd30",
    storageBucket: "estacionamento-6cd30.firebasestorage.app",
    messagingSenderId: "35569369977",
    appId: "1:35569369977:web:06667d4ec513a41f9425a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Seleção de elementos HTML
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const createAccountBtn = document.getElementById('createAccountBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Lista de e-mails e páginas associadas
const userPages = {
    "admin@neymarparking.com": "paginaAdmin.html",
    "func@neymarparking.com": "paginaFunc.html",
};

// Login com email e senha
loginBtn.addEventListener('click', async () => {
    try {
        const email = emailInput.value;
        const password = passwordInput.value;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userEmail = userCredential.user.email;

        // Verificar e-mail e redirecionar para a página correspondente
        if (userPages[userEmail]) {
            alert(`Bem-vindo, ${userEmail}`);
            window.location.href = userPages[userEmail];
        } else {
            alert('Usuário não autorizado.');
        }
    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    }
});

// Criar conta com email e senha
createAccountBtn.addEventListener('click', async () => {
    try {
        const email = emailInput.value;
        const password = passwordInput.value;
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Conta criada com sucesso!');
    } catch (error) {
        alert('Erro ao criar conta: ' + error.message);
    }
});

// Login com Google
googleLoginBtn.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const userEmail = result.user.email;

        // Verificar e-mail e redirecionar para a página correspondente
        if (userPages[userEmail]) {
            alert(`Login com Google bem-sucedido! Bem-vindo, ${userEmail}`);
            window.location.href = userPages[userEmail];
        } else {
            alert('Usuário não autorizado.');
        }
    } catch (error) {
        alert('Erro ao fazer login com Google: ' + error.message);
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('Você saiu!');
        logoutBtn.classList.add('d-none');
    } catch (error) {
        alert('Erro ao sair: ' + error.message);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const employeeDashboard = document.getElementById('employee-dashboard');
    // Simula verificação de login (troque por lógica real)
    const userIsLoggedIn = true; // Substitua por verificação real do estado de autenticação

    if (userIsLoggedIn) {
        employeeDashboard.classList.remove('d-none');
    } else {
        alert('Acesso negado. Faça login primeiro.');
        window.location.href = 'login.html';
    }
});

// Lista para armazenar os carros registrados
let carList = [];

// Função para exibir os carros na lista
function displayCarList() {
    console.log("Exibindo lista de carros...");
    const carListElement = document.getElementById('car-list');
    carListElement.innerHTML = ''; // Limpa a lista

    // Adiciona cada carro na lista
    carList.forEach((car, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `Placa: ${car}`;
        
        // Botão de remoção
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'ms-2');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => removeCar(index);
        
        listItem.appendChild(removeBtn);
        carListElement.appendChild(listItem);
    });
}

// Função para exibir as placas adicionadas abaixo
function displayAddedPlates() {
    console.log("Exibindo placas adicionadas...");
    const addedPlatesElement = document.getElementById('added-plates-list');
    addedPlatesElement.innerHTML = ''; // Limpa a lista de placas adicionadas

    // Adiciona cada placa na nova área
    carList.forEach((car) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = car;
        addedPlatesElement.appendChild(listItem);
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

    // Adiciona o carro na lista
    carList.push(plate);
    
    // Exibe a lista de carros e placas adicionadas
    displayCarList();
    displayAddedPlates();
    
    // Limpa o campo de entrada
    plateInput.value = '';
}

// Função para remover um carro
function removeCar(index) {
    console.log("Removendo carro na posição:", index); // Verificando a remoção
    // Remove o carro da lista
    carList.splice(index, 1);
    
    // Exibe a lista de carros e placas atualizadas
    displayCarList();
    displayAddedPlates();
}

// Adiciona o evento de clique no botão "Gerar Registro"
document.getElementById('generate-car-btn').addEventListener('click', addCar);

// Exibe a lista de carros ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada, exibindo lista de carros...");
    displayCarList();
});
