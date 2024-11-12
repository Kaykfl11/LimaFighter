let currentIndex = 0;

// Função para mostrar o slide atual
function showSlide(index) {
  const carousel = document.querySelector('.carousel');
  const images = document.querySelectorAll('.carousel-image');
  const totalImages = images.length;

  // Ajusta o índice para manter o carrossel em loop
  if (index > totalImages - 2) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalImages - 2;
  } else {
    currentIndex = index;
  }

  // Move o carrossel para mostrar duas imagens completas
  carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
}

// Funções para os botões de navegação
function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Configuração de autoplay
function autoPlay() {
  nextSlide();
}

// Inicia o autoplay com intervalo de 3 segundos
let autoPlayInterval = setInterval(autoPlay, 3000);

// Pausa o autoplay quando o mouse está sobre o carrossel
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
  clearInterval(autoPlayInterval);
});

// Retoma o autoplay quando o mouse sai do carrossel
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(autoPlay, 3000);
});



document.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const notification = document.getElementById("notification");
  const cartIcon = document.querySelector(".cart-icon");
  const cartItemsList = document.getElementById("cart-items-list");

  // Função para exibir a notificação temporária
  function showNotification() {
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 1500); // Notificação desaparece após 1.5 segundos
  }

  // Função para atualizar a lista de itens do carrinho ao passar o mouse
  function updateCartItemsList() {
    cartItemsList.innerHTML = "<ul>" + cartItems.map((item, index) => `
      <li>
        ${item.name} - R$${item.price}
        <button onclick="removeItem(${index})">Remover</button>
      </li>
    `).join('') + "</ul>";

    // Adiciona o botão "Pagamento" se houver itens no carrinho
    if (cartItems.length > 0) {
      cartItemsList.innerHTML += `
        <button id="paymentButton" onclick="goToPayment()">Pagamento</button>
      `;
    }

    // Salva os itens do carrinho no Local Storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Função para remover um item do carrinho (tornada global)
  window.removeItem = function (index) {
    cartItems.splice(index, 1); // Remove o item do array
    updateCartItemsList(); // Atualiza a lista para refletir a remoção
  };

  // Função para redirecionar para a página de pagamento
  window.goToPayment = function () {
    window.location.href = "/indexpagamento.html"; // Atualize com o caminho real
  };

  // Adiciona evento de clique aos botões "Comprar"
  const addToCartButtons = document.querySelectorAll(".kit-item button");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const productElement = button.parentElement;
      const productName = productElement.querySelector("h3").textContent;
      const productPrice = productElement.querySelector(".preco").textContent.replace("R$", "").trim();

      // Adiciona o produto ao array do carrinho
      cartItems.push({ name: productName, price: productPrice });

      // Mostra a notificação de item adicionado
      showNotification();

      // Atualiza a lista e o Local Storage
      updateCartItemsList();
    });
  });

  // Exibe a lista de itens do carrinho ao passar o mouse sobre o ícone do carrinho ou o próprio carrinho
  cartIcon.addEventListener("mouseenter", function () {
    updateCartItemsList();
    cartItemsList.style.display = "block";
  });

  // Mantém a lista do carrinho visível ao passar o mouse sobre ela
  cartItemsList.addEventListener("mouseenter", function () {
    cartItemsList.style.display = "block";
  });

  // Esconde a lista de itens do carrinho ao remover o mouse do ícone do carrinho e da lista
  cartIcon.addEventListener("mouseleave", function () {
    setTimeout(() => {
      if (!cartItemsList.matches(":hover")) {
        cartItemsList.style.display = "none";
      }
    }, 100);
  });

  cartItemsList.addEventListener("mouseleave", function () {
    cartItemsList.style.display = "none";
  });

  // Atualiza a lista com itens do Local Storage ao carregar a página
  updateCartItemsList();
});

