using Funcionarios.Data;
using Funcionarios.Models;
using Microsoft.EntityFrameworkCore;

namespace Funcionarios.Routes;

public static class FuncionarioRoute {
    public static void FuncionarioRoutes(this WebApplication app)
    {
        var route = app.MapGroup("funcionario");

        route.MapPost("", async (FuncionarioRequest req, FuncionarioContext context) => 
        {
            var funcionario = new FuncionarioModel(req.name, req.cargo, req.cpf, req.salario);
            await context.AddAsync(funcionario);
            await context.SaveChangesAsync();

            return Results.Created($"/funcionario/{funcionario.Id}", funcionario); 
        });

        route.MapGet("", async (FuncionarioContext context) => 
        {
            var funcionario = await context.Funcionario.ToListAsync();
            return Results.Ok(funcionario);
        });

        route.MapPut("{id:guid}", async (Guid id, FuncionarioRequest req, FuncionarioContext context) => 
        {
            var funcionario = await context.Funcionario.FirstOrDefaultAsync(x => x.Id == id);

            if (funcionario == null){
                return Results.NotFound();
            }

            funcionario.ChangeName(req.name);
            funcionario.ChangeCargo(req.cargo);
            funcionario.ChangeCpf(req.cpf);
            funcionario.ChangeSalario(req.salario);
            
            await context.SaveChangesAsync();

            return Results.Ok(funcionario);
        });

        route.MapDelete("{id:guid}", async (Guid id, FuncionarioContext context) => 
        {
            var funcionario = await context.Funcionario.FirstOrDefaultAsync(x => x.Id == id);

            if (funcionario == null){
                return Results.NotFound();
            }

            context.Funcionario.Remove(funcionario);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });

    }
}