using Funcionarios.Data;
using Funcionarios.Models;
using Microsoft.EntityFrameworkCore;

namespace Funcionarios.Routes;

public static class FuncionarioRoute {
    public static void FuncionarioRoutes(this WebApplication app)
    {
        var route = app.MapGroup("funcionario");

        route.MapPost("", async FuncionarioRequest req, FuncionarioContext context ) => 
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
            await context.SaveChangesAsync(); 

            funcionario.ChangeCargo(req.cargo);
            await context.SaveChangesAsync();

            funcionario.ChangeCpf(req.cpf);
            await context.SaveChangesAsync();

            funcionario.ChangeSalario(req.salario);
            await context.SaveChangesAsync();

            return Results.Ok(funcionario);
        });

        route.MapDelete("{id:guid}", async (Guid id, FuncionarioContext context) => 
        {
            var task = await context.Task.FirstOrDefaultAsync(x => x.Id == id);

            if (task == null){
                return Results.NotFound();
            }

            await Task.Delay(2000);

            context.Task.Remove(task);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });

    }
}