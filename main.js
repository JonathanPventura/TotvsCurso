$(document).ready(function () {
  $(".total").blur(function () {
    calculo();
    valorTotal();
  });
  limparGeral();
});

//Função responsavel por adicionar mais despesas
$(function () {
  var divContainer = $("#despesa");
  var botaoAdd = $("#BotaoAdd");

  var i = 0;

  $(botaoAdd).click(function () {
    $(` <div id="despesa${i} " class="conteudoIndividual"> 
                <div class="despesas linha" > 
                    <button type="button" class="remove" ><i class="fas fa-times"></i></button>
            
                    <select name="" id="">
                        <option value="">Hospedagem</option>
                        <option value="">Pedágio</option>
                        <option value="">Alimentação</option>
                        <option value="">Combustivel</option>
                        <option value="">Outra</option>
                    </select>
                   <input type="text" name="">
                    <input type="text" name="quantidade"  class="quantidade total" onblur="calculo()"/>
                    <input type="text" name="valor_unitario"  class="valor_unitario total" onblur="calculo()"/>
                    <input type="text" name="valor_total" class="valorTotal" disabled  />
                </div>
            </div>`).appendTo(divContainer);
    i++;
  });

  //Remove as despesas adicionadas
  $("#despesa").on("click", ".remove", function () {
    $(this).parents(".conteudoIndividual").remove();
    i--;

    valorTotal();
  });
});

// Função responsavel por fazer o subtotal
function calculo() {
  const totalGeral = [];

  $(".linha").each(function () {
    // pega os valores dos inputs
    var qtd = $(this).find("input[name=quantidade]").val();
    var val = $(this).find("input[name=valor_unitario]").val();

    var total = parseFloat(qtd) * parseFloat(val);

    //tratamento do NaN
    if (isNaN(total)) {
      $(this).find("input[name=valor_total]").val(" ").html(" ");
    } else {
      $(this)
        .find("input[name=valor_total]")
        .val(
          total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        )
        .html(total);
    }

    totalGeral.push(total);
  });

  // validação input
  $(".linha").each(function () {
    var total1 = $(this)
      .find("input[name=valor_total]")
      .val()
      .replace(/[^0-9,]*/g, "")
      .replace(",", ".");

    if (total1 >= 200) {
      $(this).addClass("selected").hasClass("linha");
    } else {
      $(this).removeClass("selected").hasClass("linha");
    }
  });

  valorTotal();
}

//Função responsavel por colocar o valor total Geral
function valorTotal() {
  var s1 = 0;
  $(".linha").each(function () {
    var teste = parseFloat(
      $(this)
        .find("input[name=valor_total]")
        .val()
        .replace(/[^0-9,]*/g, "")
        .replace(",", ".")
    );

    if (typeof teste == "number" && !isNaN(teste)) {
      s1 += teste;
      $(".totalDespesas > p").html(
        s1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      );
    } else {
    }
  });
}

// Função responsavel no botão Limpar
function limparGeral() {
  $(".limpar").on("click", function () {
    $(".valorTotal").val("R$ 0.000,00").html("R$ 0.000,00");
    $(".linha").removeClass("selected").hasClass("linha");
  });
}
