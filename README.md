# FavStore: minha lista de produtos favoritos

Aplicação desenvolvida para o exercício de prática de Next.js da FIAP. O usuário faz login, consulta produtos da API pública [DummyJSON](https://dummyjson.com/docs/products) e salva os seus favoritos no navegador.

**Aplicação publicada:** COLE_AQUI_O_LINK_DA_VERCEL

## Tecnologias

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4

## Funcionalidades

- Login com usuário e senha, validado no servidor por um Route Handler (`/api/login`)
- Sessão guardada em cookie `httpOnly` assinado, que mantém o usuário logado ao atualizar a página
- Proteção das páginas pelo `proxy.ts`: quem não está logado é enviado para `/login`
- Listagem inicial com 15 produtos e busca com o mesmo limite, consultando a API enquanto o usuário digita
- Estados de carregamento, de nenhum resultado e de falha na API (com botão para tentar novamente)
- Favoritar e desfavoritar produtos, com os favoritos salvos no `localStorage`
- Página de favoritos e destaque visual nos produtos já favoritados
- Botão de logout no topo da tela, que também apaga os favoritos
- Página de detalhes do produto (`/produtos/[id]`) com descrição, marca, desconto, garantia, política de devolução, avaliações e botão de favoritar

## Como rodar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env.local` na raiz do projeto, usando o `.env.example` como modelo, e defina a senha:

   ```env
   APP_PASSWORD=sua_senha_aqui
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000). O usuário pode ser qualquer nome, e a senha é a definida em `APP_PASSWORD`.

## Variáveis de ambiente

| Variável       | Descrição                                                                 |
| -------------- | ------------------------------------------------------------------------- |
| `APP_PASSWORD` | Senha de acesso ao sistema. Também é usada para assinar o cookie de sessão. |

A variável não tem o prefixo `NEXT_PUBLIC_`, então só pode ser lida no servidor e nunca é enviada ao navegador. Na Vercel, ela deve ser cadastrada em **Settings > Environment Variables**.

## Estrutura de pastas

```
app/
  (protegido)/            páginas da área logada (o grupo não aparece na URL)
    layout.tsx            cabeçalho com menu e botão de sair
    page.tsx              busca e listagem de produtos (/)
    favoritos/page.tsx    lista de favoritos (/favoritos)
    produtos/[id]/        página de detalhes do produto
  api/
    login/route.ts        valida a senha e cria o cookie de sessão
    logout/route.ts       remove o cookie de sessão
  login/page.tsx          tela de login
  layout.tsx              layout raiz
components/               componentes da interface
hooks/useFavorites.ts     leitura e gravação dos favoritos no localStorage
lib/
  auth.ts                 criação e validação do token de sessão (somente servidor)
  products.ts             requisições para a DummyJSON
types/product.ts          tipos TypeScript dos dados da API
proxy.ts                  protege as rotas antes de renderizar a página
```

## Autor

Júlio César Iwata
