
const livros = [
    { titulo: "JavaScript para Iniciantes", autor: "João Silva", disponivel: true },
    { titulo: "CSS Avançado", autor: "Maria Oliveira", disponivel: false },
    { titulo: "React Rápido", autor: "Ana Souza", disponivel: true },
];

const livrosDisponiveis = livros.filter(livro => livro.disponivel);

console.log(livrosDisponiveis);
