let produtosData = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            produtosData = data; // Armazenar os dados dos produtos
            carregarProdutos(produtosData);
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

function carregarProdutos(produtos) {
    const gridProdutos = document.getElementById('grid-produtos');
    gridProdutos.innerHTML = ''; // Limpar produtos existentes

    produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
        `;
        produtoDiv.onclick = () => abrirIframe(produto.url);
        gridProdutos.appendChild(produtoDiv);
    });
}

function filtrarProdutos() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const produtosFiltrados = produtosData.filter(produto => 
        produto.nome.toLowerCase().includes(searchValue)
    );
    carregarProdutos(produtosFiltrados);
}

function abrirIframe(url) {
    document.getElementById('iframe-produto').src = url;
    document.getElementById('detalhes').style.display = 'flex';
}

function fecharDetalhes() {
    document.getElementById('detalhes').style.display = 'none';
    document.getElementById('iframe-produto').src = ''; // Limpa o iframe
}
