# Guia Para Flow de Desenvolvimento




<p align="center">
  <img width="100" height="100" src="https://avatars2.githubusercontent.com/u/58614957?s=400&u=d133ba2f65c51ecb72cdf6753ab378b77fef46a4&v=4">
</p>

Para auxiliar o flow de desenvolvimento seguem apontamentos das regras do fluxo de trabalho.


1. [Branchs](#branchs);
2. [Commits](#commits);
3. [Issues](#issues).



## Branchs:

Iremos adotar o Design Flow  baseado no Workflow Design: Git Flow. 


<p align="center">
  <img width="600" height="400" src="https://miro.medium.com/max/1400/1*37fUoaJlxltek38OCdHy2g.png">
</p>

#### Regras para esse flow:

#### Master : 
Referente às pocs tudo estável: 

- Deve ser tagueado com a versão da poc.

#### Release : 
Para ambiente externo colocar nas play stores

- Deve ser tagueada com a versão da play store e apple store:

#### Develop : 
Seria o ponto mais estável do desenvolvimento.

- Quando for gerar as apks  para release interna deve-se taguear o branch com a versão da apk. 

#### Feature/ Hotfix : 
Para as funcionalidades / bugs

1. Cria-se no GitLab uma issue com o label de feature ou hotfix, com sua respectiva descrição e assinar ela para ti ao finalizar usa-se o id criado  na nomenclatura da branch:

     ** [id gerado no gitlab] - [abreviatura da feature]**

2. Só poderá passar para branch develop, se tiver a certeza que essa feature vai ser utilizada numa release interna e externa;

3. Antes de realizar o **merge resquest** da sua branch na develop, precisa efetuar o **git rebase** da develop na sua branch ;

4. Verificar se há conflito, se houver, resolvê-lo. Consequentemente testa-se a aplicação;

5. Criar-se um **merge request** da sua branch para o develop.


## Commits:
Os commits devem ser especificos e iniciar com um verbo o qual denote uma ação.

     ex: git commit -m "Realiza correções das mensagens durante as atualizações da mDL no holder."


## Issues

Ao finalizar a codificação da branch (feature / hotfix) deve-se usar um dos verbetes abaixo seguido por #[id da issue], caso queira fechar sua issue de forma automática.



|         |          |          |
| ------- |:--------:| --------:|
| fix     | fixes    |   fixed  |
| close 2 | closes   |   closed |
| resolve | resolves | resolved |



      ex: git commit -m "Fim da branch - Close #4"