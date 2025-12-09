Funcionalidade: Atualização de itens na loja Gilded Rose
  Como lojista
  Eu quero que a lógica de atualização de itens seja especificada em cenários legíveis
  Para que possamos validar comportamento esperado para diferentes tipos de itens

  Contexto:
    Dado que existe uma implementação de "Shop" que atualiza itens

  Cenário: Item normal diminui qualidade e sellIn
    Dado um item "foo" com sellIn = 5 e quality = 10
    Quando a loja atualiza a qualidade
    Então o sellIn do item deve ser 4
    E a quality do item deve ser 9

  Cenário: Item normal degrada duas vezes após o sell date
    Dado um item "foo" com sellIn = 0 e quality = 10
    Quando a loja atualiza a qualidade
    Então o sellIn do item deve ser -1
    E a quality do item deve ser 8

  Cenário: Aged Brie aumenta de qualidade e respeita o limite
    Dado um item "Aged Brie" com sellIn = 2 e quality = 0
    Quando a loja atualiza a qualidade
    Então o sellIn do item deve ser 1
    E a quality do item deve ser 1

  Cenário: Aged Brie não ultrapassa a qualidade máxima
    Dado um item "Aged Brie" com sellIn = 5 e quality = 50
    Quando a loja atualiza a qualidade
    Então a quality do item deve permanecer 50

  Cenário Outline: Backstage passes aumenta de forma condicional
    Dado um item "Backstage passes to a TAFKAL80ETC concert" com sellIn = <sellIn> e quality = <quality>
    Quando a loja atualiza a qualidade
    Então o sellIn do item deve ser <expectedSellIn>
    E a quality do item deve ser <expectedQuality>

    Exemplos:
      | sellIn | quality | expectedSellIn | expectedQuality |
      | 15     | 20      | 14             | 21              |
      | 10     | 20      | 9              | 22              |
      | 5      | 20      | 4              | 23              |
      | 0      | 20      | -1             | 0               |
      | 5      | 49      | 4              | 50              |

  Cenário: Sulfuras não muda
    Dado um item "Sulfuras, Hand of Ragnaros" com sellIn = 5 e quality = 80
    Quando a loja atualiza a qualidade
    Então o sellIn do item deve permanecer 5
    E a quality do item deve permanecer 80

  Cenário: Múltiplos itens são processados independentemente
    Dado os itens:
      | name                                               | sellIn | quality |
      | foo                                                | 1      | 1       |
      | Aged Brie                                          | 1      | 1       |
      | Backstage passes to a TAFKAL80ETC concert          | 1      | 1       |
      | Sulfuras, Hand of Ragnaros                         | 1      | 80      |
    Quando a loja atualiza a qualidade
    Então as qualities resultantes devem ser:
      | index | expectedQuality |
      | 0     | 0               |
      | 1     | 2               |
      | 2     | 3               |
      | 3     | 80              |

  Cenário: Qualidade é sempre mantida entre 0 e 50
    Dado um item "foo" com sellIn = 5 e quality = -10
    Quando a loja atualiza a qualidade
    Então a quality do item deve ser 0

    Dado um item "Aged Brie" com sellIn = 5 e quality = 55
    Quando a loja atualiza a qualidade
    Então a quality do item deve ser 50
