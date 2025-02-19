// Array para armazenar os servidores
let servers = [];

// Função para adicionar servidor
document.getElementById('serverForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const server = {
        id: Date.now(),
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        code: document.getElementById('code').value,
        salary: document.getElementById('salary').value
    };

    servers.push(server);
    updateTable();
    this.reset();
});

// Função para atualizar a tabela
function updateTable(filteredServers = servers) {
    const tbody = document.getElementById('serversTableBody');
    tbody.innerHTML = '';

    filteredServers.forEach(server => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${server.name}</td>
            <td>${server.position}</td>
            <td>${server.code}</td>
            <td>R$ ${parseFloat(server.salary).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editServer(${server.id})">Editar</button>
                <button class="delete-btn" onclick="deleteServer(${server.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para buscar servidores
function searchServers() {
    const name = document.getElementById('searchName').value.toLowerCase();
    const position = document.getElementById('searchPosition').value.toLowerCase();
    const code = document.getElementById('searchCode').value.toLowerCase();
    const salary = document.getElementById('searchSalary').value;

    const filteredServers = servers.filter(server => {
        return (
            server.name.toLowerCase().includes(name) &&
            server.position.toLowerCase().includes(position) &&
            server.code.toLowerCase().includes(code) &&
            (salary === '' || parseFloat(server.salary) === parseFloat(salary))
        );
    });

    updateTable(filteredServers);
}

// Função para editar servidor
function editServer(id) {
    const server = servers.find(s => s.id === id);
    if (server) {
        document.getElementById('name').value = server.name;
        document.getElementById('position').value = server.position;
        document.getElementById('code').value = server.code;
        document.getElementById('salary').value = server.salary;
        
        // Remove o servidor atual
        servers = servers.filter(s => s.id !== id);
        updateTable();
    }
}

function deleteServer(id) {
    if (confirm('Tem certeza que deseja excluir este servidor?')) {
        servers = servers.filter(server => server.id !== id);
        updateTable();
    }
}

updateTable(); 