
document.getElementById("runExercise1").addEventListener("click", () => {
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(i + 23); 
    }
    document.getElementById("output1").textContent = array.join("\n"); 
  });

  document.getElementById("runExercise2").addEventListener("click", () => {
    let nomes = ["Dino", "Baby", "Charlote"];
    let nomesComSobrenome = nomes.map(nome => `${nome} da Silva Sauro`);
    document.getElementById("output2").textContent = nomesComSobrenome.join("\n"); 
  });
  