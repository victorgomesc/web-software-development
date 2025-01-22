const vendas = [
    { produto: "Notebook", preco: 2500, quantidade: 2 },
    { produto: "Smartphone", preco: 1500, quantidade: 3 },
    { produto: "Teclado", preco: 200, quantidade: 5 },
  ];
  
  const totalVendas = vendas.reduce((total, venda) => 
    total + venda.preco * venda.quantidade, 0
  );
  
  console.log(totalVendas); 
  