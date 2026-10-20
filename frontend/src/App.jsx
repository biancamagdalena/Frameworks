


import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/">MeuSite<span>Vendas</span></Link>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <div className="header-actions">
        <Link to="/login">Entrar</Link>
        <Link className="cart-button" to="/carrinho">🛒 Carrinho <b>0</b></Link>
      </div>
    </header>
  );
}

function ProductCard({ produto }) {
  return (
    <article className="product-card">
      <div className="product-image">{produto.emoji}</div>
      <span className="badge">{produto.categoria}</span>
      <h3>{produto.nome}</h3>
      <p className="price">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
      <small>{produto.estoque} unidades disponíveis</small>
      <div className="card-actions">
        <Link className="btn secondary" to={`/produto/${produto._id || produto.id}`}>Ver produto</Link>
        <button className="btn primary" >Comprar</button>
      </div>
    </article>
  );
}

function Home({ produtos }) {

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">PROJETO INTEGRADOR • FRAMEWORKS WEB</span>
          <h1>Seu marketplace.<br/><strong>Seu projeto.</strong></h1>
          <p>Uma aplicação de vendas pronta para você aprender desenvolvendo. O desafio é transformar esta base em um e-commerce completo.</p>
          <Link className="btn primary large" to="/produtos">Explorar produtos</Link>
        </div>
        <div className="hero-art">🛍️</div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">DESTAQUES</span><h2>Produtos em destaque</h2></div>
          <Link to="/produtos">Ver todos →</Link>
        </div>
        <div className="product-grid">
          {produtos.slice(0, 4).map(p => <ProductCard key={p._id || p.id} produto={p} />)}
        </div>
      </section>

    </>
  );
}

function Produtos({ produtos }) {
  // DESAFIO — FILTRO DE PRODUTOS
  // Complete as etapas indicadas abaixo durante a aula.


  // ETAPA 1 — Crie o estado "busca" iniciando com uma string vazia.
  const[busca, setBusca] = useState("");

  // ETAPA 2 — Crie o estado "categoria" iniciando com "Todos".
  const [categoria, setCategoria] = useState("Todos")

  // ETAPA 3 — Crie o estado "ordenacao" iniciando com uma string vazia.
  const [ordenacao, setOrdenacao] = useState("");
  // ETAPA 4 — Crie "produtosFiltrados" usando produtos.filter().
  // Regras:
  // - pesquisar pelo nome OU pela categoria;
  // - ignorar diferença entre letras maiúsculas e minúsculas;
  // - se a categoria for "Todos", aceitar qualquer categoria.
  const produtosFiltrados = produtos.filter((produto) => {
    const textoBusca = busca.toLowerCase();
    
    const correspondeBusca =
     produto.nome.toLowerCase().includes(textoBusca) ||
     (produto.categoria || "").toLowerCase().includes(textoBusca);
    
   
   const correspondeCategoria =
     categoria === "Todos" || produto.categoria === categoria;
   
  
  return correspondeBusca && correspondeCategoria;

  });

  // ETAPA 5 — Crie "produtosExibidos" a partir de produtosFiltrados.
  // Use uma cópia do array e sort().
  // "menor-preco" → menor para maior.
  // "maior-preco" → maior para menor.
  const produtosExibidos = [...produtosFiltrados].sort((a, b) => {
  if (ordenacao === "menor-preco") {
    return a.preco - b.preco;
  }

  if (ordenacao === "maior-preco") {
    return b.preco - a.preco;
  }

  return 0;
});
{/*Até aqui
  */}

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CATÁLOGO</span>
          <h2>Todos os produtos</h2>
        </div>

        <input
          className="search"
          placeholder="🔎 Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          /* ETAPA 6 — Ligue o input ao estado busca usando value e onChange. */
        />
      </div>

      <div className="filters">
        {/* ETAPA 7 — Complete os três botões para alterar a categoria. */}
        <button
          className={categoria === "Todos" ? "active" : ""}
          onClick={() => setCategoria("Todos")}
        >
          Todos
        </button>

        <button
          className={categoria === "Informática" ? "active" : ""}
          onClick={() => setCategoria("Informática")}
        >
          Informática
        </button>
        <button
          className={categoria === "Eletrônicos" ? "active" : ""}
          onClick={() => setCategoria("Eletrônicos")}
        >
          Eletrônicos
        </button>

        {/* ETAPA 8 — Ligue o select ao estado ordenacao usando value e onChange. */}
        
        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
        </select>
      </div>

      <div className="product-grid">
        {/* ETAPA 9 — Troque "produtos" pelo array final do filtro. */}
        {produtosExibidos.map((produto) => (
          <ProductCard
            key={produto._id || produto.id}
            produto={produto}
          />
        ))}
      </div>
    </section>
  );
}

function Produto() {
  return (
    <section className="section product-detail">
      <div className="detail-image">💻</div>
      <div>
        <span className="badge">Informática</span>
        <h1>Notebook Pro 15</h1>
        <p className="price big">R$ 2.499,90</p>
        <p>Notebook de demonstração do projeto. Esta tela está pronta para o aluno integrar com a API e o banco de dados.</p>
        <p><b>Estoque:</b> 8 unidades</p>
        <button className="btn primary large" >Adicionar ao carrinho</button>
      </div>
    </section>
  );
}

function Login() {
  return (
    <section className="form-page">
      <div className="form-card">
        <span className="eyebrow">ÁREA DO CLIENTE</span>
        <h1>Entrar</h1>
        <label>E-mail<input type="email" placeholder="cliente@email.com"/></label>
        <label>Senha<input type="password" placeholder="••••••••"/></label>
        <button className="btn primary large" >Entrar</button>
        <p>Não possui conta? <Link to="/cadastro">Criar cadastro</Link></p>
      </div>
    </section>
  );
}

function Cadastro() {
  return (
    <section className="form-page">
      <div className="form-card">
        <span className="eyebrow">NOVO CLIENTE</span>
        <h1>Criar conta</h1>
        <label>Nome<input placeholder="Seu nome"/></label>
        <label>E-mail<input type="email" placeholder="voce@email.com"/></label>
        <label>Senha<input type="password" placeholder="••••••••"/></label>
        <button className="btn primary large" >Cadastrar</button>
      </div>
    </section>
  );
}

function Carrinho() {
  return (
    <section className="section">
      <span className="eyebrow">COMPRA</span>
      <h1>Seu carrinho</h1>
      <div className="empty-cart">
        <div>🛒</div>
        <h2>Carrinho vazio</h2>
        <p>O carrinho será desenvolvido em uma etapa futura do projeto.</p>
        <Link className="btn primary" to="/produtos">Continuar comprando</Link>
      </div>
    </section>
  );
}

function Admin({ produtos, setProdutos }) {
  async function excluirProduto(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/api/produtos/${id}`,
        {
          method: "DELETE"
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao excluir produto.");
        return;
      }

      setProdutos((produtosAtuais) =>
        produtosAtuais.filter((produto) => produto._id !== id)
      );

      alert(dados.mensagem || "Produto excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir produto:", erro);
      alert("Erro ao conectar com a API.");
    }
  }

  return (
    <section className="section">
      <div className="admin-head">
        <div>
          <span className="eyebrow">ADMINISTRAÇÃO</span>
          <h1>Painel administrativo</h1>
        </div>

        <Link to="/admin/produtos/novo" className="btn primary">
          + Novo produto
        </Link>
      </div>

      <div className="stats">
        <div><small>Produtos</small><strong>{produtos.length}</strong><span>Cadastrados</span></div>
        <div><small>Pedidos</small><strong>137</strong><span>Em demonstração</span></div>
        <div><small>Clientes</small><strong>482</strong><span>Em demonstração</span></div>
        <div><small>Vendas</small><strong>R$ 28.450</strong><span>Em demonstração</span></div>
      </div>

      <div className="admin-table">
        <div className="table-title">
          <h2>Produtos</h2>
        </div>

        {produtos.map((p) => (
          <div className="row" key={p._id}>
            <span>{p.emoji} <b>{p.nome}</b></span>
            <span>R$ {p.preco.toFixed(2).replace(".", ",")}</span>
            <span>{p.estoque}</span>
            <span>
              <Link
                className="mini"
                to={`/admin/produtos/editar/${p._id}`}
              >
                Editar
              </Link>

              <button
                className="mini danger"
                onClick={() => excluirProduto(p._id)}
              >
                Excluir
              </button>
            </span>
          </div>
        ))}
      </div>

      <div className="implementation">
        <h2>CRUD de produtos concluído</h2>
        <div className="todo-grid">
          <span>✓ CREATE — POST</span>
          <span>✓ READ — GET</span>
          <span>✓ UPDATE — PUT</span>
          <span>✓ DELETE — DELETE</span>
          <span>✓ MongoDB</span>
          <span>✓ Filtro de produtos</span>
        </div>
      </div>
    </section>
  );
}

function NovoProduto({ setProdutos }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const navigate = useNavigate();

  async function cadastrarProduto() {
  try {
    const novoProduto = {
      nome,
      descricao,
      categoria,
      preco: Number(preco),
      estoque: Number(estoque),
      ativo: true
    };
    const resposta = await fetch(
      "http://localhost:3000/api/produtos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoProduto)
      }
    );
    const dados = await resposta.json();
    if (!resposta.ok) {
  alert("Erro ao cadastrar produto.");
  return;
}
setProdutos((produtosAtuais) => [
  ...produtosAtuais,
  dados
]);
alert("Produto cadastrado com sucesso!");
setNome("");
setDescricao("");
setCategoria("");
setPreco("");
setEstoque("");
navigate("/admin");
    console.log("Resposta da API:", dados);
  } catch (erro) {
    console.error("Erro ao cadastrar produto:", erro);
  }
}
  return (
    <section className="section">
      <div className="form-card">
        <span className="eyebrow">ADMINISTRAÇÃO</span>
        <h1>Cadastrar novo produto</h1>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do produto"
          />
        </label>
        <label>
      Descrição
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição do produto"
      />
    </label>
        <label>
          Categoria
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Categoria"
          />
        </label>
        <label>
          Preço
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço"
          />
        </label>
        <label>
          Estoque
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            placeholder="Quantidade em estoque"
          />
        </label>
        <div className="form-actions">
          <Link
            to="/admin"
            className="btn"
          >
            Cancelar
          </Link>
          <button
          className="btn primary"
          onClick={cadastrarProduto}
          >
          Cadastrar produto
          </button>
        </div>
      </div>
    </section>
  );
}
   
   

function EditarProduto({ setProdutos }) {

  
  const { id } = useParams();

  
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  
  const navigate = useNavigate();

  
  useEffect(() => {
    async function carregarProduto() {
      try {
        const resposta = await fetch(
          `http://localhost:3000/api/produtos/${id}`
        );

        if (!resposta.ok) {
          alert("Produto não encontrado.");
          navigate("/admin");
          return;
        }

        const produto = await resposta.json();

        setNome(produto.nome);
        setDescricao(produto.descricao || "");
        setCategoria(produto.categoria);
        setPreco(produto.preco);
        setEstoque(produto.estoque);

      } catch (erro) {
        console.error("Erro ao carregar produto:", erro);
        alert("Erro ao conectar com a API.");
      }
    }

    carregarProduto();
  }, [id, navigate]);

  
  async function salvarAlteracoes() {
    try {
      const produtoAtualizado = {
        nome,
        descricao,
        categoria,
        preco: Number(preco),
        estoque: Number(estoque),
        ativo: true
      };

      const resposta = await fetch(
        `http://localhost:3000/api/produtos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(produtoAtualizado)
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao atualizar produto.");
        return;
      }

      
      setProdutos((produtosAtuais) =>
        produtosAtuais.map((produto) =>
          produto._id === dados._id ? dados : produto
        )
      );

      alert("Produto atualizado com sucesso!");
      navigate("/admin");

    } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);
      alert("Erro ao conectar com a API.");
    }
  }

  
  return (
    <section className="section">
      <div className="form-card">
        <span className="eyebrow">ADMINISTRAÇÃO</span>
        <h1>Editar produto</h1>

        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>
          Descrição
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        <label>
          Categoria
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </label>

        <label>
          Preço
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </label>

        <label>
          Estoque
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
          />
        </label>

        <div className="form-actions">
          <button
            className="btn"
            type="button"
            onClick={() => navigate("/admin")}
          >
            Cancelar
          </button>

          <button
            className="btn primary"
            type="button"
            onClick={salvarAlteracoes}
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </section>
  );
}


function App() {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch(
          "http://localhost:3000/api/produtos"
        );
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        console.error(
          "Erro ao carregar produtos:",
          erro
        );
      }
    }
    carregarProdutos();
  }, []);
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home produtos={produtos} />} />
          <Route path="/produtos" element={<Produtos produtos={produtos}/>}/>
          <Route path="/produto/:id" element={<Produto/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/carrinho" element={<Carrinho/>}/>
          <Route path="/admin" element={<Admin produtos={produtos} setProdutos={setProdutos} />}/>
          <Route
            path="/admin/produtos/novo"
            element={<NovoProduto setProdutos={setProdutos} />}
          />

          {}
          <Route
            path="/admin/produtos/editar/:id"
            element={<EditarProduto setProdutos={setProdutos} />}
          />
        </Routes>
      </main>

      <footer>
        <b>SobrouVendi</b> • Projeto Integrador de Frameworks Web
      </footer>
    </>
  );
}

export default App;
