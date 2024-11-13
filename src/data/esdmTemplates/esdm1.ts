import { ChecklistTemplate } from '../../types/checklist';

export const ESDM_LEVEL_1: ChecklistTemplate = {
  id: 'esdm-1',
  name: 'ESDM Nível 1',
  description: 'Avaliação inicial do Early Start Denver Model',
  categories: [
    {
      id: 'comunicacao-receptiva',
      name: 'Comunicação Receptiva',
      items: [
        { id: '1', title: 'Localiza os sons voltando-se para a fonte sonora', completed: false },
        { id: '2', title: 'Olha para os sons vocais lúdicos (vibração de língua com ruído, assobio)', completed: false },
        { id: '3', title: 'Responde à voz, voltando-se para a pessoa', completed: false },
        { id: '4', title: 'Olha para as imagens indicadas à medida que o adulto aponta para as imagens de um livro', completed: false },
        { id: '5', title: 'Segue um ponto proximal para colocar objetos em recipientes, peças de um quebra-cabeça, etc', completed: false },
        { id: '6', title: 'Olha quando lhe mostram um objeto e dizem: "(nome), olha!"', completed: false },
        { id: '7', title: 'Olha para o parceiro quando chamado pelo nome', completed: false },
        { id: '8', title: 'Segue um ponto proximal a um objeto ou localização', completed: false },
        { id: '9', title: 'Segue um ponto distal para recuperar um brinquedo', completed: false },
        { id: '10', title: 'Olha, alcança ou sorri em resposta aos gestos e voz dos adultos em jogos sociais', completed: false },
        { id: '11', title: 'Olha, alcança, sorri e/ou gesticula em resposta à linguagem/gestos dos adultos em canções', completed: false },
        { id: '12', title: 'Responde interrompendo ações momentaneamente em resposta a palavras inibitórias', completed: false },
        { id: '13', title: 'Dá o objeto pedido verbalmente quando combinado com a mão estendida de um adulto', completed: false },
        { id: '14', title: 'Executa uma instrução de rotina de uma etapa envolvendo ações corporais combinadas com pistas verbais/gestuais', completed: false },
        { id: '15', title: 'Executa uma instrução verbal de rotina envolvendo ações corporais sem acompanhamento do gesto', completed: false }
      ]
    },
    {
      id: 'comunicacao-expressiva',
      name: 'Comunicação Expressiva',
      items: [
        { id: '16', title: 'Usa o alcance dirigido para fazer pedidos', completed: false },
        { id: '17', title: 'Vocaliza com intenção', completed: false },
        { id: '18', title: '"Pede" ajuda entregando um objeto ao adulto', completed: false },
        { id: '19', title: 'Toma a vez vocalizando com o parceiro de comunicação', completed: false },
        { id: '20', title: 'Expressa recusa afastando um objeto ou devolvendo o objeto à outra pessoa', completed: false },
        { id: '21', title: 'Aponta para um local próximo para pedir objetos desejados', completed: false },
        { id: '22', title: 'Estabelece contato visual para obter um objeto desejado quando o adulto bloqueia o acesso/retém o objeto', completed: false },
        { id: '23', title: 'Aponta para indicar uma escolha entre dois objetos', completed: false },
        { id: '24', title: 'Combina a vocalização e o olhar para pedidos intencionais', completed: false },
        { id: '25', title: 'Aponta para um local distante para pedir objetos desejados', completed: false },
        { id: '26', title: 'Aponta para um local distante para indicar escolha entre dois objetos', completed: false },
        { id: '27', title: 'Vocaliza com balbucios reduplicados CVCV', completed: false },
        { id: '28', title: 'Produz cinco ou mais consoantes em vocalizações espontâneas', completed: false },
        { id: '29', title: 'Produz CVCV com sequências CV diferentes (balbucio diversificado)', completed: false }
      ]
    },
    {
      id: 'competencias-sociais',
      name: 'Competências Sociais',
      items: [
        { id: '30', title: 'Aceita breves atividades sensori-sociais e o toque', completed: false },
        { id: '31', title: 'Usa ajuda motora para iniciar ou continuar uma rotina sensori-social', completed: false },
        { id: '32', title: 'Segue brevemente a outra pessoa com contato visual', completed: false },
        { id: '33', title: 'Mantém o envolvimento em rotinas sensori-sociais por 2 min', completed: false },
        { id: '34', title: 'Responde a objetos/atividades preferidos com o olhar, alcance, sorrisos e movimentos', completed: false },
        { id: '35', title: 'Observa e interage com o adulto que a imita durante atividades paralelas com brinquedos', completed: false },
        { id: '36', title: 'Tem um repertório de 5-10 jogos sensori-sociais', completed: false },
        { id: '37', title: 'Responde aos cumprimentos olhando, virando-se, etc', completed: false },
        { id: '38', title: 'Responde à saudação com gestos ou vocalização', completed: false },
        { id: '39', title: 'Partilha sorrisos com o parceiro durante um jogo coordenado', completed: false }
      ]
    },
    {
      id: 'imitacao',
      name: 'Imitação',
      items: [
        { id: '40', title: 'Imita 8-10 ações de um passo com objeto', completed: false },
        { id: '41', title: 'Imita 10 ações motoras visíveis dentro de uma canção/rotinas de jogo', completed: false },
        { id: '42', title: 'Imita 6 ações motoras invisíveis na cabeça e na face em canções/rotinas de jogo', completed: false },
        { id: '43', title: 'Imita 6 movimentos oro-faciais', completed: false }
      ]
    },
    {
      id: 'cognicao',
      name: 'Cognição',
      items: [
        { id: '44', title: 'Corresponde/agrupa objetos idênticos', completed: false },
        { id: '45', title: 'Corresponde/agrupa imagens idênticas', completed: false },
        { id: '46', title: 'Corresponde/agrupa imagens a objetos', completed: false },
        { id: '47', title: 'Corresponde/agrupa objetos pela cor', completed: false }
      ]
    },
    {
      id: 'jogo',
      name: 'Jogo',
      items: [
        { id: '48', title: 'Adéqua o comportamento às qualidades de 5 objetos diferentes', completed: false },
        { id: '49', title: 'Brinca de forma autônoma e apropriada com 10 brinquedos de uma ação', completed: false },
        { id: '50', title: 'Brinca de forma autônoma com brinquedos que exigem a repetição da mesma ação em vários objetos', completed: false },
        { id: '51', title: 'Demonstra comportamentos de jogo apropriados numa variedade de brinquedos de uma ação', completed: false },
        { id: '52', title: 'Brinca de forma autônoma com brinquedos que requerem duas ações motoras diferentes', completed: false },
        { id: '53', title: 'Brinca de forma autônoma com brinquedos que requerem várias ações motoras diferentes', completed: false },
        { id: '54', title: 'Demonstra ações convencionais em si própria com uma variedade de objetos', completed: false },
        { id: '55', title: 'Completa a atividade de jogo e afasta-a', completed: false }
      ]
    },
    {
      id: 'motricidade-fina',
      name: 'Motricidade Fina',
      items: [
        { id: '56', title: 'Coloca uma ou duas peças num jogo de encaixe', completed: false },
        { id: '57', title: 'Coloca anéis num anel empilhador', completed: false },
        { id: '58', title: 'Completa um quebra-cabeça de 3 peças madeira', completed: false },
        { id: '59', title: 'Introduz num quadro de pinos', completed: false },
        { id: '60', title: 'Carrega em botões em cinco tipos de brinquedos de causa e efeito diferentes', completed: false },
        { id: '61', title: 'Desmancha encaixes de contas, legos', completed: false },
        { id: '62', title: 'Usa um movimento de pinça ou a preensão de três dedos conforme adequado ao brinquedo', completed: false },
        { id: '63', title: 'Empilha 3 grandes blocos numa torre', completed: false },
        { id: '64', title: 'Faz marcas, linhas, rabiscos e pontos com marcadores/lápis de cor', completed: false },
        { id: '65', title: 'Bate com o martelo de brincar em bolas, pinos, etc', completed: false },
        { id: '66', title: 'Usa pás, rastelos, despeja areia, água, arroz, etc', completed: false },
        { id: '67', title: 'Empilha grandes legos', completed: false }
      ]
    },
    {
      id: 'motricidade-grossa',
      name: 'Motricidade Grossa',
      items: [
        { id: '68', title: 'Chuta bola grande', completed: false },
        { id: '69', title: 'Sobe e desce escadas com ajuda, sem alternar os pés', completed: false },
        { id: '70', title: 'Sobe um ou dois degraus numa escada pequena para deslizar', completed: false },
        { id: '71', title: 'Sobe e desce de equipamentos', completed: false },
        { id: '72', title: 'Protege-se quando fica sem equilíbrio', completed: false },
        { id: '73', title: 'Contorna os objetos no chão em vez de os pisar', completed: false },
        { id: '74', title: 'Atira bolas e saquinhos de feijão em qualquer direção', completed: false },
        { id: '75', title: 'Rola um objeto para frente e para trás com outra pessoa', completed: false }
      ]
    },
    {
      id: 'comportamento',
      name: 'Comportamento',
      items: [
        { id: '76', title: 'Exibe dificuldades mínimas de comportamento severo', completed: false },
        { id: '77', title: 'Senta-se numa cadeira ou de frente para o adulto durante atividades que lhe dão prazer sem dificuldades por um/dois minutos', completed: false },
        { id: '78', title: 'Envolve-se voluntariamente em jogos simples na cadeira e no chão com adultos, por 5 minutos', completed: false },
        { id: '79', title: 'Tolera a proximidade e a interação com adultos (com pedidos mínimos) sem problemas de comportamento em intervalos de 20 min', completed: false },
        { id: '80', title: 'Interage de forma adequada com membros da família (ou seja, sem agressão ou outras interações inapropriadas)', completed: false }
      ]
    },
    {
      id: 'independencia-pessoal',
      name: 'Independência Pessoal',
      items: [
        { id: '81', title: 'Come refeições e lanches à mesa', completed: false },
        { id: '82', title: 'Come a refeição de forma autônoma', completed: false },
        { id: '83', title: 'Usa um copo aberto', completed: false },
        { id: '84', title: 'Usa uma colher', completed: false },
        { id: '85', title: 'Usa um garfo', completed: false },
        { id: '86', title: 'Come alimentos de várias texturas, tipos e grupos', completed: false },
        { id: '87', title: 'Tolera novos alimentos no prato', completed: false },
        { id: '88', title: 'Bebe pelo canudinho', completed: false },
        { id: '89', title: 'Remove cada peça de roupa com ajuda', completed: false },
        { id: '90', title: 'Veste cada peça de roupa com ajuda', completed: false },
        { id: '91', title: 'Põe as mãos debaixo da água corrente', completed: false },
        { id: '92', title: 'Seca as mãos com uma toalha', completed: false },
        { id: '93', title: 'Esfrega a toalha de rosto ou de banho pelo corpo', completed: false },
        { id: '94', title: 'Tolera pentear o cabelo, assoar o nariz e escovar os dentes', completed: false },
        { id: '95', title: 'Ajuda com a escova de dentes/pente', completed: false },
        { id: '96', title: 'Põe a escova de dentes na boca', completed: false },
        { id: '97', title: 'Põe a roupa suja no cesto', completed: false },
        { id: '98', title: 'Põe o papel higiênico no lixo', completed: false }
      ]
    }
  ]
};