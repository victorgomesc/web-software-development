const produtos = [
    { nome: "Camiseta", preco: 50 },
    { nome: "Calça", preco: 100 },
    { nome: "Tênis", preco: 200 },
  ];
  
  const produtosComDesconto = produtos.map(produto => {
    return {
      nome: produto.nome, 
      preco: produto.preco, 
      precoComDesconto: produto.preco 
    };
  });
  
  console.log(produtosComDesconto);
  