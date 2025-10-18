# 🚀 Mitra: Sistema de Gestão de Investimentos (Global Solution - CP3)

Este projeto é um aplicativo móvel desenvolvido em React Native para gerenciar investimentos, oferecendo um sistema de autenticação e funcionalidades CRUD (Criar, Ler, Atualizar, Deletar).

## 🧑‍💻 Integrantes do Grupo

| Nome Completo | RM |
| :--- | :--- |
| Eduardo Fedeli Souza | 550132 |
| Gabriel Torres Luiz | 98600 |
| Otavio Vitoriano | 552012 |

---

## 💡 Funcionalidades do Aplicativo

### 1. Sistema de Autenticação (Login e Registro)
- **Tela de Login:** Permite que o usuário acesse a aplicação.
- **Tela de Registro:** Permite a criação de uma nova conta de usuário.
- **Contexto de Autenticação (`AuthContext`):** Gerencia o estado do usuário (`user` e `loading`) e o token, garantindo que o usuário logado seja redirecionado para a `HomeScreen`.
- **Logout:** Função para encerrar a sessão do usuário.

### 2. Gestão de Investimentos (CRUD Completo)
A tela `InvestmentScreen` implementa todas as operações de gestão de dados consumindo a API Restful.

| Funcionalidade | Operação | Detalhes |
| :--- | :--- | :--- |
| **Listagem** | **READ (GET)** | Exibe todos os investimentos do usuário. Lida com estados de carregamento (`loading`) e erro de forma visual. |
| **Adicionar** | **CREATE (POST)** | Abre um modal de formulário para criar um novo investimento, enviando os dados para a API. |
| **Editar** | **UPDATE (PUT)** | Permite selecionar um investimento existente, abre o modal preenchido e envia a atualização para a API. |
| **Excluir** | **DELETE (DELETE)** | Exclui um investimento após uma confirmação de segurança (`Alert.alert`). |

### 3. Tratamento de Erros e UX (Atendimento aos Critérios de Validação)

- **Validação de Formulários:** Campos obrigatórios são verificados antes do envio (ex: nome e valor do investimento).
- **Feedback de Erro (30pts - Validação):**
    - Se a API falhar ao carregar os dados, exibe uma mensagem de erro clara e informativa, junto a um **botão "Tentar Novamente"** para reexecutar a função `loadInvestments()`.
    - Erros de Login/Registro e operações CRUD são tratados com `Alert.alert` para feedback imediato.
- **Navegação Fluida (30pts - Navegação):**
    - Uso do `react-navigation` com `NativeStack` para uma experiência nativa.
    - O botão de **`< Voltar`** e o botão **"Voltar para Home"** na tela `Investment` garantem o retorno imediato ao estado anterior.

### 4. Arquitetura e Organização (10pts)
O projeto segue uma arquitetura modular clara, utilizando TypeScript e separação de responsabilidades:

- **`/src`**
    - **`/components`:** Componentes reutilizáveis (`Button`).
    - **`/screens`:** Telas da aplicação (`LoginScreen`, `HomeScreen`, `InvestmentScreen`).
    - **`/contexts`:** Gerenciamento de estado global (`AuthContext`).
    - **`/navigation`:** Configuração do navegador e tipagem (`types.ts`, `AppNavigator`).
    - **`/services`:** Conexão com a API (`api.ts`).

---

## 💻 Como Executar o Projeto

Siga os passos abaixo para clonar, instalar dependências e rodar o aplicativo em seu emulador Android/iOS ou dispositivo físico (via Expo Go).

#### Pré-requisitos
1.  **Node.js e npm/yarn:** Instalados na máquina.
2.  **Expo CLI:** Recomendado para iniciar o projeto.
    
    npm install -g expo-cli
    
3.  **Emulador/Dispositivo:** Um emulador Android Studio, ou o aplicativo **Expo Go** instalado no seu celular.

#### 1. Clonar o Repositório
git clone https://github.com/EduardoFedeli/Mitra.git

cd Mitra


2. Instalar as Dependências
Execute este comando para instalar todas as bibliotecas e pacotes necessários:

npm install 

3. Iniciar a API (Mock/Backend)
AVISO: Este aplicativo consome dados de uma API externa (ou de um mock local, como o JSON Server). É obrigatório que o backend esteja ativo e acessível na porta configurada (geralmente http://localhost:3000) para que a aplicação funcione corretamente.

4. Iniciar o Aplicativo Expo
Inicie o servidor de desenvolvimento do React Native:

Bash

npx expo start
Ao rodar o comando, o Expo CLI abrirá uma página no navegador e exibirá um QR Code no seu terminal.

5. Abrir no Emulador ou Dispositivo
Para Android: Pressione a tecla a no terminal.