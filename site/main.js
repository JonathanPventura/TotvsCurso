$(function (){
    var divContainer = $('#despesa');
    var botaoAdd = $('#BotaoAdd');
    var i = 4;

    $(botaoAdd).click(function(){
        $(' <div id="despesa'+i+'" class="conteudoIndividual"> <div class="despesas linha" > <button type="button" class="remove"><i class="fas fa-times"></i></button>  <select name="" id=""> <option value="">Hospedagem</option>  <option value="">Pedágio</option> <option value="">Alimentação</option> <option value="">Combustivel</option> <option value="">Outra</option>  </select><input type="text" name=""><input type="text" name=""><input type="text" name=""><input type="text" name="">').appendTo(divContainer)
            i++;
    });

   


    $('#despesa').on('click', '.remove', function(){
        $(this).parents('.conteudoIndividual').remove();
        i--;
    })

});