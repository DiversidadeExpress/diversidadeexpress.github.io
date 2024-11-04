document.addEventListener("DOMContentLoaded", function() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(data => {
            const gridProdutos = document.getElementById('grid-produtos');
            data.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.classList.add('produto');
                produtoDiv.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                `;
                produtoDiv.onclick = () => mostrarDetalhes(produto.nome, produto.descricao);
                gridProdutos.appendChild(produtoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

function mostrarDetalhes(titulo, descricao) {
    document.getElementById('titulo-detalhes').innerText = titulo;
    document.getElementById('descricao-detalhes').innerText = descricao;
    document.getElementById('detalhes').style.display = 'flex';
}

function fecharDetalhes() {
    document.getElementById('detalhes').style.display = 'none';
}
