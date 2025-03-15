# YOLOv8 Object Detection Frontend

Este projeto é uma aplicação web que utiliza o modelo YOLOv8 para detecção de objetos em imagens. O frontend é construído com React e TypeScript, enquanto o backend é desenvolvido com FastAPI. A aplicação permite que os usuários enviem imagens, selecionem classes de objetos para detecção e visualizem as imagens anotadas.

## Funcionalidades

- Upload de Imagens: Envie múltiplas imagens para detecção de objetos.

- Seleção de Classes: Escolha as classes de objetos que deseja detectar.

- Visualização de Imagens Anotadas: Veja as imagens com as detecções destacadas.

- Exportação de Anotações: Exporte as anotações em formato JSON (separado ou consolidado).

- Limpeza de Cache: Limpe o cache de imagens e anotações.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (para o frontend)

- Python (para o backend)

- Git (para clonar o repositório)

## Como Executar o Projeto

1. Clone o Repositório

### `git clone https://github.com/seu-usuario/yolov8-detection-frontend.git cd yolov8-detection-frontend`

2. Configuração do Backend (FastAPI)

Navegue até a pasta do backend:

### `cd backend`

Crie um ambiente virtual e ative-o:

### `python -m venv venv source venv/bin/activate  # No Windows, use `venv\Scripts\activate``

Execute o servidor FastAPI:

### `uvicorn main:app --reload`

O backend estará disponível em http://localhost:8000.

3. Configuração do Frontend (React)

Navegue até a pasta do frontend:

### `cd ../frontend`

Instale as dependências:

### `npm install`

Execute o servidor de desenvolvimento:

### `npm start`

O frontend estará disponível em http://localhost:3000.

4. Acesse a Aplicação

Abra o navegador e acesse http://localhost:3000 para usar a aplicação.

## Estrutura do Projeto

- backend/: Contém o código do backend em FastAPI.
 - main.py: Ponto de entrada do backend.
 - requirements.txt: Lista de dependências do Python.
- frontend/: Contém o código do frontend em React e TypeScript.
 - src/: Código-fonte do frontend.
  - App.tsx: Componente principal da aplicação.
  - App.css: Estilos globais.
 - public/: Arquivos estáticos (imagens, ícones, etc.).

## Dependências

### Backend (FastAPI)

- fastapi: Framework para construção da API.

- uvicorn: Servidor ASGI para executar o FastAPI.

- ultralytics: Biblioteca para usar o modelo YOLOv8.

- opencv-python: Para processamento de imagens.

### Frontend (React)

- react: Biblioteca para construção de interfaces.

- react-bootstrap: Componentes React baseados no Bootstrap.

- axios: Para fazer requisições HTTP ao backend.

- react-zoom-pan-pinch: Para funcionalidade de zoom nas imagens.

