# PataPlay — Seu pet, seu estilo!

Beta funcional de um pet shop interativo. Interface em português, personagens SVG próprios, composição visual em tempo real, loja, carrinho e checkout **inteiramente simulado**. Sem backend, pagamentos ou agendamentos reais.

## Requisitos e execução

- Node.js 24 e npm.
- Navegador moderno; armazenamento local habilitado para preservar os dados.

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite (normalmente http://127.0.0.1:5173).

Neste computador, as dependências já estão instaladas. O npm não está no PATH e o cmd é bloqueado pela política do Windows. A alternativa pronta é executar no PowerShell, dentro desta pasta:

```powershell
.\iniciar.ps1
```

O script usa o Node disponível no PATH ou o runtime do Codex, sem mudar a política de segurança. Em outro computador, instale Node com npm e use os comandos padrão.

## Comandos

```sh
npm run dev           # Servidor local
npm run build         # TypeScript + build em dist/
npm run preview       # Prévia da versão compilada
npm test              # Testes de lógica (Vitest)
npm run test:e2e      # Fluxo em desktop e celular (Playwright)
```

Para os testes de navegador em uma nova máquina, execute primeiro `npx playwright install chromium`. Opcionalmente, defina `PLAYWRIGHT_CHANNEL=chrome` para usar o Chrome instalado. Os testes iniciam o Vite automaticamente. Com um servidor já iniciado em um ambiente que bloqueia cmd, defina `PATAPLAY_EXTERNAL_SERVER=1`.

## Funcionalidades

- Landing page e galeria de Shih Tzu, Poodle, Golden Retriever, Yorkshire e Spitz.
- Nome e porte do pet, com portes e acabamentos compatíveis com a raça.
- Estúdio com antes/depois, acabamento, higiene opcional, acessórios, cinco cores e essência única.
- SVGs locais com desenhos por raça; pelagem, acessórios e partículas são camadas reais.
- Animações de olhos, rabo e perfume; preferência por movimento reduzido respeitada.
- Resultado final, catálogo ilustrado de oito produtos, filtros e quantidades de 0 a 20.
- Checkout com nome, telefone, e-mail, observações e pagamento ilustrativo.
- Pedidos com UUID, snapshot imutável dos preços e histórico local dos últimos 50 pedidos.
- Navegação para trás, persistência após recarga e tratamento de dados corrompidos ou armazenamento indisponível.

## Regras de preço

Todos os valores são inteiros em **centavos**, centralizados em `src/lib/pricing.ts`.

| Item | Regra |
| --- | --- |
| Banho e escovação | Pequeno R$ 55; médio R$ 70; grande R$ 95 |
| Acabamento | Uma opção: natural incluído; bebê +R$ 45; tesoura +R$ 60; alinhamento +R$ 30 |
| Multiplicador de acabamento/higiene | Pequeno 1×; médio 1,2×; grande 1,5× |
| Higiene | Opcional e acumulável, +R$ 25 antes do multiplicador |
| Acessório | Um por serviço, R$ 0 a R$ 15, sem multiplicador |
| Essência | Uma por pedido, R$ 0 a R$ 7, sem multiplicador |
| Produtos | Preço unitário × quantidade, separados do acessório do serviço |

Golden e Spitz recebem banho/escovação ou acabamento natural conservador, sem opções de raspagem ou tosa bebê. As imagens são aproximações; a avaliação real da pelagem cabe ao profissional.

**Cenário de referência:** Thor, Shih Tzu pequeno + banho R$ 55 + tosa bebê R$ 45 + bandana R$ 15 + lavanda R$ 7 = **R$ 122**. Uma bolinha de R$ 24,90 resulta em **R$ 146,90**.

## Estrutura

```text
src/
  components/
    pet/              # Dog, Coat e AccessoryLayer em SVG
    ProductArt.tsx    # Ilustrações locais da loja
    ui.tsx            # Componentes compartilhados
  data/               # Catálogos tipados de raças, serviços e produtos
  lib/
    pricing.ts        # Cálculo único em centavos
    state.ts          # Reducer, normalização e criação de pedidos
    storage.ts        # Interface de persistência local
    app.test.ts       # Testes de domínio e SVG
  pages/              # Oito telas da experiência
  state/Store.tsx      # React Context, persistência e histórico de navegação
  styles/             # Estilos por área e responsividade
  types.ts            # Contratos do domínio
e2e/                  # Testes completos em desktop e celular
netlify.toml          # Build e publicação no Netlify
```

A persistência utiliza a chave `pataplay:v1`. Dados do responsável também ficam exclusivamente no navegador. Não use informações sensíveis: o checkout permite dados fictícios. Limpar os dados do site apaga rascunho e histórico. Mudanças de domínio, porta, protocolo ou navegador não compartilham localStorage.

## Publicar no GitHub e Netlify

O projeto não precisa de variáveis de ambiente ou serviços externos.

1. Crie um repositório vazio no GitHub.
2. Com Git autenticado, inicialize e envie o código:
   ```sh
   git init -b main
   git add .
   git commit -m "Implementa beta funcional do PataPlay"
   git remote add origin https://github.com/SEU_USUARIO/pataplay.git
   git push -u origin main
   ```
3. No Netlify, importe esse repositório.
4. A configuração já está em `netlify.toml`: comando `npm run build`, pasta publicada `dist`, Node 24.
5. Publique e abra a URL gerada.

Também é possível enviar diretamente a pasta `dist` para uma publicação manual no Netlify, após `npm run build`. Para atualizações automáticas, prefira o repositório GitHub.

## Validação

Os testes de lógica cobrem preço, porte, exclusividade de essência, compatibilidade de cortes, diferenças vetoriais nas cinco raças, carrinho, persistência, corrupção de dados, validação e snapshot de pedidos. Os testes de navegador verificam o cenário Thor, retorno entre telas, raças de pelagem dupla, recarga, histórico, formulário e movimento reduzido em desktop e celular.

## Limitações e próximos passos

- Dados, disponibilidade e preços são fictícios. Sem estoque, autenticação, agenda, entrega ou pagamento.
- As ilustrações são aproximações artísticas. A higiene é indicada por brilho discreto, sem representar áreas anatômicas.
- Histórico e rascunho são locais; não há sincronização entre dispositivos ou garantia de recuperação após limpeza do navegador.
- Sem reserva de horários ou confirmação enviada por e-mail/telefone.
- Evolução sugerida: API de catálogo e pedidos, persistência remota, autenticação, agenda profissional, imagens por artista e integração de pagamento com validação no servidor.
- As camadas `Coat` e `AccessoryLayer` usam o mesmo viewBox 400×400, permitindo novos assets sem reescrever o fluxo.


Verificação realizada nesta entrega: 21 testes Vitest e 10 testes Playwright aprovados (5 cenários em desktop e celular), build de produção aprovado e auditoria npm sem vulnerabilidades conhecidas.
