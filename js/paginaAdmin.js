import { getDatabase, ref, set } from "firebase/database";

// Inicializando o Firebase
const database = getDatabase(); 

// Função para atualizar a tarifa de estacionamento
async function updateTariff() {
    const newTariff = document.getElementById('tariff').value;

    // Verificando se o valor da tarifa é válido
    if (newTariff && !isNaN(newTariff)) {
        try {
            const tariffRef = ref(database, 'settings/tariff'); // Caminho para a tarifa no Realtime Database
            await set(tariffRef, { value: parseFloat(newTariff) }); // Atualizando o valor da tarifa
            alert('Tarifa atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar tarifa:', error);
            alert('Erro ao atualizar a tarifa. Tente novamente.');
        }
    } else {
        alert('Por favor, insira um valor válido para a tarifa.');
    }
}

// Função para gerar e baixar o relatório diário (JSON ou XML)
async function generateReport(format) {
    const today = new Date().toISOString().split('T')[0]; // Data de hoje no formato yyyy-mm-dd
    const ticketsRef = collection(db, 'tickets');
    try {
        const ticketSnapshot = await getDocs(ticketsRef);
        let ticketData = [];

        ticketSnapshot.forEach(doc => {
            const ticket = doc.data();
            if (ticket.date && ticket.date.split('T')[0] === today) {
                ticketData.push(ticket);
            }
        });

        if (format === 'json') {
            downloadJSON(ticketData);
        } else if (format === 'xml') {
            downloadXML(ticketData);
        }
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        alert('Erro ao gerar o relatório. Tente novamente.');
    }
}

// Função para fazer o download do relatório em JSON
function downloadJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Função para fazer o download do relatório em XML
function downloadXML(data) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<tickets>';
    data.forEach(ticket => {
        xml += `\n  <ticket>
      <id>${ticket.id}</id>
      <plate>${ticket.plate}</plate>
      <date>${ticket.date}</date>
      <amount>${ticket.amount}</amount>
    </ticket>`;
    });
    xml += '\n</tickets>';

    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_${new Date().toISOString().split('T')[0]}.xml`;
    link.click();
}