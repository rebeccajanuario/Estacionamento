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
