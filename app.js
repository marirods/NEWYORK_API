"use strict";


const API_KEY = "N9TFCBKOqj4CBryZWTbb0msxZqejFeuU"

const inputGenero = document.getElementById("genero")
const botaoBuscar = document.getElementById("buscargenero")
const listaLivros = document.getElementById("lista")
const detalhesLivro = document.querySelector(".livros-informacoes")

botaoBuscar.addEventListener("click", buscarLivros)


async function buscarLivros() {
    const busca = inputGenero.value.trim(); 
    if (!busca) {
        alert("Digite um gênero ou nome de autor")
        return
    }

    try {
        const url = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${encodeURIComponent(busca)}&api-key=${API_KEY}`
        const resposta = await fetch(url)
        const dados = await resposta.json()

        
        if (!dados.results || dados.results.length === 0) {
            listaLivros.innerHTML = "<p>Nenhum livro encontrado.</p>"
            return;
        }

        exibirLivros(dados.results);
    } catch (erro) {
        console.error("Erro ao buscar livros:", erro)
        listaLivros.innerHTML = "<p>Erro ao buscar livros. Tente novamente.</p>"
    }
}

/**
 * Exibe a lista de livros na interface.
 * @param {Array} livros
 */
function exibirLivros(livros) {
    listaLivros.innerHTML = ""

    livros.forEach((livro) => {
        const item = document.createElement("li")
        item.textContent = livro.book_title
        item.classList.add("livro-item")
        item.addEventListener("click", () => exibirDetalhesLivro(livro))
        listaLivros.appendChild(item)
    })
    listaLivros.style.display = "block"; 
    detalhesLivro.style.display = "none"; 
}


/*** Exibe os detalhes do livro selecionado.
 * @param {Object} livro 
 */

function exibirDetalhesLivro(livro) {
    
    detalhesLivro.innerHTML = `
        <h1>${livro.book_title}</h1>
        <p><strong>Autor:</strong> ${livro.book_author}</p>
        <p><strong>Sinopse do livro:</strong> ${livro.summary || "Sem sinopse disponível."}</p>
        <p><strong>Crítica:</strong> <a href="${livro.url}" target="_blank">Leia a crítica completa</a></p>
        <button onclick="fecharDetalhes()">Voltar</button>
    `;
    detalhesLivro.style.display = "block";
    listaLivros.style.display = "none"; 

    document.getElementById("voltar").addEventListener("click", fecharDetalhes);

}


function fecharDetalhes() {
    detalhesLivro.style.display = "none";
    listaLivros.style.display = "block";
}
