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

document.addEventListener('DOMContentLoaded', () => {
    const employeeDashboard = document.getElementById('employee-dashboard');
    const adminDashboard = document.getElementById('admin-dashboard');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const email = user.email;
            if (email === "admin@neymarparking.com") {
                document.getElementById('adminDashboard').classList.remove('d-none');
            } else if (email === "func@neymarparking.com") {
                document.getElementById('employeeDashboard').classList.remove('d-none');
            } else {
                alert("Usuário não autorizado.");
                window.location.href = "login.html";
            }
        } else {
            alert("Por favor, faça login.");
            window.location.href = "login.html";
        }
    });
});





