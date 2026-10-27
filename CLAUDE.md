@AGENTS.md

## Portofolio Vault (Obsidian)

O vault Obsidian do projeto está em `Portofolio-Vault/` (dentro desta pasta, registado no Obsidian).

- Usa-o para notas, decisões, ideias e planeamento do portefólio; o código fica em `src/`.
- Notas em Markdown com sintaxe Obsidian (wikilinks, frontmatter). Usa as skills `obsidian:*` ao editar.
- `Portofolio-Vault/docs` é uma junction para `docs/` do projeto, para que a documentação (auditorias, metodologia) apareça no vault.
- Não editar `Portofolio-Vault/.obsidian/` à mão.

### Regra: manter vault e graphify atualizados

Sempre que alterares código ou conteúdo do website (`src/`, `public/`, `scripts/`, configs):

1. Atualiza o vault: cria ou edita uma nota em `Portofolio-Vault/` (ex.: `Changelog.md` com data, o que mudou e porquê; notas por página/componente quando fizer sentido), com wikilinks para as notas relacionadas.
2. Corre `graphify update .` no fim das alterações (um hook já o faz após Edit/Write, mas confirma que correu sem erros).
3. Menciona no resumo final o que foi atualizado no vault.
