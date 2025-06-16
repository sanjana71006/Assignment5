const productsContainer = document.getElementById("products");

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    productsContainer.innerHTML = "";

    data.products.forEach(product => {
      // Add extra dummy details manually
      product.sku = `SKU-${product.id}`;
      product.weight = `${(Math.random() * 5 + 1).toFixed(2)} kg`;
      product.dimensions = "10x15x20 cm";
      product.warranty = "1 year warranty";
      product.shippingInfo = "Ships in 3-5 business days";
      product.availability = product.stock > 0 ? "In Stock" : "Out of Stock";
      product.returnPolicy = "30-day return policy";
      product.minOrder = 1;

      const card = document.createElement("div");
      card.className = "product";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Rating:</strong> ${product.rating} ⭐</p>
      `;

      // Store product and redirect
      card.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "details.html";
      });

      productsContainer.appendChild(card);
    });
  })
  .catch(error => {
    productsContainer.innerHTML = "Failed to load products.";
    console.error("Error:", error);
  });
