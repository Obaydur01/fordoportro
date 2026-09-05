/* ==========================================================================
   SHWAPNO EXPRESS - BENGALI ONLINE GROCERY APP LOGIC
   ========================================================================== */

// --- PRODUCT DATABASE ---
const products = [
  {
    id: 'p1',
    name: 'Fresh Padma Hilsa Fish (ইলিশ মাছ)',
    category: 'MeatFish',
    price: 1290,
    oldPrice: 1450,
    unit: '1 kg',
    unitsAvailable: ['500g (৳650)', '1 kg (৳1,290)', '1.5 kg (৳1,890)'],
    discount: '11% OFF',
    rating: 4.9,
    reviews: 312,
    badge: 'FRESH PADMA',
    image: 'assets/ilish_fish.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=500&q=80',
    description: '100% Authentic Padma River Hilsa directly sourced from Chandpur ghat. Freshly iced, formalin-free guarantee.',
    inStock: true,
    isFlash: true
  },
  {
    id: 'p2',
    name: 'Rajshahi Sweet Mangoes (রাজশাহী আম)',
    category: 'Produce',
    price: 140,
    oldPrice: 180,
    unit: '1 kg',
    unitsAvailable: ['1 kg (৳140)', '3 kg (৳400)', '5 kg (৳650)'],
    discount: '22% OFF',
    rating: 4.8,
    reviews: 184,
    badge: 'ORGANIC',
    image: 'assets/mangoes.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
    description: 'Sweet, juicy, naturally ripened Rajshahi Amrapali mangoes. Hand-picked from top Rajshahi orchards.',
    inStock: true,
    isFlash: true
  },
  {
    id: 'p3',
    name: 'Radhuni Pure Mustard & Spices (সরিষার গুঁড়া ও মসলা)',
    category: 'Grocery',
    price: 210,
    oldPrice: 240,
    unit: '500g',
    unitsAvailable: ['250g (৳110)', '500g (৳210)', '1 kg (৳400)'],
    discount: '12% OFF',
    rating: 4.7,
    reviews: 95,
    badge: 'STAPLE',
    image: 'assets/spices.jpg',
    fallbackImg: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    description: 'Aromatic pure spices including turmeric, red chili, cumin and mustard seeds milled under hygenic standards.',
    inStock: true,
    isFlash: false
  },
  {
    id: 'p4',
    name: 'Shwapno Premium Minikat Rice (মিনিকেট চাল)',
    category: 'Grocery',
    price: 365,
    oldPrice: 400,
    unit: '5 kg',
    unitsAvailable: ['5 kg (৳365)', '10 kg (৳720)', '25 kg (৳1,750)'],
    discount: '৳35 SAVINGS',
    rating: 4.9,
    reviews: 420,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    description: 'Slender, long grain polished Minikat rice. Perfect for daily family meals, biryani and polao.',
    inStock: true,
    isFlash: true
  },
  {
    id: 'p5',
    name: 'Farm Fresh Sonali Chicken Whole (সোনালী মুরগী)',
    category: 'MeatFish',
    price: 320,
    oldPrice: 360,
    unit: '1 kg',
    unitsAvailable: ['800g (৳260)', '1 kg (৳320)', '1.5 kg (৳470)'],
    discount: '11% OFF',
    rating: 4.8,
    reviews: 215,
    badge: 'HALAL FRESH',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80',
    description: 'Freshly dressed Sonali chicken processed in hygienic Halal abattoir. Tender, flavorful meat.',
    inStock: true,
    isFlash: false
  },
  {
    id: 'p6',
    name: 'Aarong Dairy Pure Pasteurized Milk (আড়ং দুধ)',
    category: 'Dairy',
    price: 90,
    oldPrice: 95,
    unit: '1 Litre',
    unitsAvailable: ['500ml (৳48)', '1 Litre (৳90)', '2 Litres (৳175)'],
    discount: 'SAVE ৳5',
    rating: 4.9,
    reviews: 510,
    badge: 'DAIRY',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80',
    description: '100% Pure, wholesome pasteurized liquid milk enriched with Vitamin A & D.',
    inStock: true,
    isFlash: false
  },
  {
    id: 'p7',
    name: 'Fresh Red Tomatoes & Vegetables (টমেটো)',
    category: 'Produce',
    price: 65,
    oldPrice: 85,
    unit: '1 kg',
    unitsAvailable: ['500g (৳35)', '1 kg (৳65)', '2 kg (৳120)'],
    discount: '23% OFF',
    rating: 4.6,
    reviews: 142,
    badge: 'FARM FRESH',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
    description: 'Farm-fresh vine-ripened red tomatoes rich in antioxidants and vitamins.',
    inStock: true,
    isFlash: true
  },
  {
    id: 'p8',
    name: 'Teer Pure Fortified Soybean Oil (সয়াবিন তেল)',
    category: 'Grocery',
    price: 840,
    oldPrice: 890,
    unit: '5 Litres',
    unitsAvailable: ['1 Litre (৳175)', '2 Litres (৳345)', '5 Litres (৳840)'],
    discount: 'SAVE ৳50',
    rating: 4.9,
    reviews: 630,
    badge: 'ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    description: 'Vitamin A enriched double refined pure soybean oil for healthy daily cooking.',
    inStock: true,
    isFlash: false
  },
  {
    id: 'p9',
    name: 'Farm Fresh Brown Eggs (ফার্মের ডিম)',
    category: 'Dairy',
    price: 145,
    oldPrice: 160,
    unit: '1 Dozen (12 Pcs)',
    unitsAvailable: ['6 Pcs (৳75)', '12 Pcs (৳145)', '30 Pcs (৳350)'],
    discount: '9% OFF',
    rating: 4.8,
    reviews: 380,
    badge: 'PROTEIN',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=80',
    description: 'High quality farm fresh brown eggs rich in omega-3 and essential proteins.',
    inStock: true,
    isFlash: true
  },
  {
    id: 'p10',
    name: 'Finlay Premium Black Tea (ফিনলে চা)',
    category: 'Snacks',
    price: 195,
    oldPrice: 220,
    unit: '400g',
    unitsAvailable: ['200g (৳105)', '400g (৳195)'],
    discount: '11% OFF',
    rating: 4.7,
    reviews: 110,
    badge: 'TEA',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
    description: 'Strong, aromatic CTC black tea picked from Sylhet tea gardens.',
    inStock: true,
    isFlash: false
  },
  {
    id: 'p11',
    name: 'Fresh Deshi Potato (দেশি আলু)',
    category: 'Produce',
    price: 45,
    oldPrice: 55,
    unit: '1 kg',
    unitsAvailable: ['1 kg (৳45)', '5 kg (৳210)', '10 kg (৳400)'],
    discount: '18% OFF',
    rating: 4.7,
    reviews: 290,
    badge: 'STAPLE',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    description: 'Crisp, premium quality Deshi Munshiganj potatoes.',
    inStock: true,
    isFlash: false
  },
  {
    id: 'p12',
    name: 'Fresh Boneless Beef Meat (গরুর মাংস)',
    category: 'MeatFish',
    price: 780,
    oldPrice: 850,
    unit: '1 kg',
    unitsAvailable: ['500g (৳400)', '1 kg (৳780)', '2 kg (৳1,520)'],
    discount: 'SAVE ৳70',
    rating: 4.9,
    reviews: 388,
    badge: 'PREMIUM MEAT',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=500&q=80',
    description: 'Grass-fed fresh boneless tender beef meat. Processed strictly under Halal supervision.',
    inStock: true,
    isFlash: true
  }
];

// --- APP STATE ---
let state = {
  cart: JSON.parse(localStorage.getItem('shwapno_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('shwapno_wishlist') || '[]'),
  location: localStorage.getItem('shwapno_location') || 'Gulshan-2, Dhaka',
  currentCategory: 'all',
  currentSort: 'featured',
  searchQuery: '',
  appliedCoupon: null,
  lang: 'en',
  theme: 'light'
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  renderFlashDeals();
  renderRecipePreview('hilsa');
  updateCartUI();
  updateWishlistUI();

  // Start Flash Countdown
  startCountdown();
});

// --- RENDER FUNCTIONS ---

function renderCategories() {
  const categories = [
    { id: 'Produce', name: 'Vegetables & Fruits', icon: 'fa-apple-whole' },
    { id: 'MeatFish', name: 'Padma Hilsa & Meat', icon: 'fa-fish' },
    { id: 'Grocery', name: 'Rice, Oil & Spices', icon: 'fa-wheat-awn' },
    { id: 'Dairy', name: 'Milk & Farm Eggs', icon: 'fa-cow' },
    { id: 'Snacks', name: 'Snacks & Drinks', icon: 'fa-cookie-bite' }
  ];

  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="filterProducts('${cat.id}', event)">
      <div class="cat-icon-wrap"><i class="fa-solid ${cat.icon}"></i></div>
      <span>${cat.name}</span>
    </div>
  `).join('');

  // Also populate Category Drawer
  const drawerList = document.getElementById('catDrawerList');
  drawerList.innerHTML = categories.map(cat => `
    <div class="cat-drawer-item" onclick="filterProducts('${cat.id}', event); closeCategoryDrawer();">
      <i class="fa-solid ${cat.icon} text-red"></i>
      <span>${cat.name}</span>
    </div>
  `).join('');
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  let filtered = products.filter(p => {
    const matchCat = state.currentCategory === 'all' || p.category === state.currentCategory;
    const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort logic
  if (state.currentSort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (state.currentSort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (state.currentSort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  document.getElementById('itemCountLabel').innerText = `Showing ${filtered.length} Items`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px;">
      <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: var(--text-muted);"></i>
      <h3 style="margin-top: 10px;">No matching groceries found</h3>
      <p style="color: var(--text-muted);">Try searching for "Hilsa", "Rice", "Mangoes" or "Milk"</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
}

function renderFlashDeals() {
  const flashGrid = document.getElementById('flashProductsGrid');
  const flashItems = products.filter(p => p.isFlash);
  flashGrid.innerHTML = flashItems.map(p => createProductCardHTML(p, true)).join('');
}

function createProductCardHTML(p, isFlashMode = false) {
  const cartItem = state.cart.find(item => item.id === p.id);
  const isWishlisted = state.wishlist.includes(p.id);

  return `
    <div class="product-card">
      <span class="discount-badge">${p.discount}</span>
      <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}')">
        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
      </button>

      <div class="product-img-wrapper" onclick="openProductModal('${p.id}')">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='${p.fallbackImg}'">
      </div>

      <span class="product-meta">${p.badge} • ⭐ ${p.rating} (${p.reviews})</span>
      <h4 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h4>

      <select class="product-unit-select" id="unit_${p.id}">
        ${p.unitsAvailable.map(u => `<option value="${u}">${u}</option>`).join('')}
      </select>

      <div class="product-price-row">
        <span class="current-price">৳ ${p.price}</span>
        <span class="old-price">৳ ${p.oldPrice}</span>
      </div>

      ${cartItem ? `
        <div class="qty-control-group">
          <button class="qty-btn" onclick="updateCartQuantity('${p.id}', ${cartItem.qty - 1})">-</button>
          <span class="qty-number">${cartItem.qty} in Cart</span>
          <button class="qty-btn" onclick="updateCartQuantity('${p.id}', ${cartItem.qty + 1})">+</button>
        </div>
      ` : `
        <button class="add-to-cart-btn" onclick="addToCart('${p.id}')">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      `}
    </div>
  `;
}

// --- RECIPE BUILDER SYSTEM ---
const recipes = {
  hilsa: {
    title: 'Sorshe Ilish (Mustard Hilsa Curry)',
    items: ['p1', 'p3', 'p8'], // Hilsa, Spices, Soybean Oil
    servings: '4 Persons',
    prepTime: '25 Mins'
  },
  kacchi: {
    title: 'Shahi Beef Kacchi Biryani',
    items: ['p4', 'p12', 'p3'], // Rice, Beef, Spices
    servings: '6 Persons',
    prepTime: '45 Mins'
  },
  roast: {
    title: 'Special Chicken Roast',
    items: ['p5', 'p6', 'p8'], // Chicken, Milk, Oil
    servings: '4 Persons',
    prepTime: '30 Mins'
  }
};

function loadRecipe(recipeKey) {
  document.querySelectorAll('.recipe-pill').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderRecipePreview(recipeKey);
}

function renderRecipePreview(recipeKey) {
  const recipe = recipes[recipeKey];
  const itemObjs = recipe.items.map(id => products.find(p => p.id === id));
  const totalPrice = itemObjs.reduce((sum, item) => sum + item.price, 0);

  const card = document.getElementById('recipePreviewCard');
  card.innerHTML = `
    <h4><i class="fa-solid fa-utensils text-red"></i> ${recipe.title}</h4>
    <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">
      ⏱️ Prep: ${recipe.prepTime} • 🍽️ Servings: ${recipe.servings}
    </p>
    <ul class="recipe-ingredient-list">
      ${itemObjs.map(item => `
        <li>
          <span>✔️ ${item.name}</span>
          <strong>৳ ${item.price}</strong>
        </li>
      `).join('')}
    </ul>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
      <div>
        <span style="font-size:0.75rem; color:var(--text-muted);">Kit Total Price:</span>
        <h3 class="text-red">৳ ${totalPrice}</h3>
      </div>
      <button class="btn btn-yellow" onclick="addRecipeKitToCart(['${recipe.items.join("','")}'])">
        <i class="fa-solid fa-basket-shopping"></i> Add All Ingredients
      </button>
    </div>
  `;
}

function addRecipeKitToCart(itemIds) {
  itemIds.forEach(id => addToCart(id));
  showToast('🍲 All ingredients added to your cart!');
  toggleCartDrawer();
}

// --- CART MANAGEMENT ---

function addToCart(productId) {
  const prod = products.find(p => p.id === productId);
  const unitSelect = document.getElementById(`unit_${productId}`);
  const selectedUnit = unitSelect ? unitSelect.value : prod.unit;

  const existingIndex = state.cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    state.cart[existingIndex].qty += 1;
  } else {
    state.cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      unit: selectedUnit,
      image: prod.image,
      fallbackImg: prod.fallbackImg,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  renderProducts();
  renderFlashDeals();
  showToast(`Added ${prod.name} to Cart!`);
}

function updateCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    state.cart = state.cart.filter(item => item.id !== productId);
  } else {
    const item = state.cart.find(item => item.id === productId);
    if (item) item.qty = newQty;
  }
  saveCart();
  updateCartUI();
  renderProducts();
  renderFlashDeals();
}

function saveCart() {
  localStorage.setItem('shwapno_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let discount = 0;
  if (state.appliedCoupon === 'SHWAPNO100' && subtotal >= 800) discount = 100;
  if (state.appliedCoupon === 'FRESH20') discount = Math.round(subtotal * 0.2);
  if (state.appliedCoupon === 'EID2026') discount = 250;

  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Header badges
  document.getElementById('cartBadge').innerText = totalCount;
  document.getElementById('cartHeaderTotal').innerText = `৳ ${subtotal}`;
  document.getElementById('cartDrawerCount').innerText = totalCount;

  // Free shipping bar
  const neededForFree = 1000 - subtotal;
  const progressBar = document.getElementById('freeShippingProgress');
  const progressText = document.getElementById('freeShippingText');

  if (subtotal >= 1000) {
    progressBar.style.width = '100%';
    progressText.innerHTML = '🎉 You unlocked <strong>FREE Express Delivery</strong>!';
  } else {
    const pct = Math.min(100, (subtotal / 1000) * 100);
    progressBar.style.width = `${pct}%`;
    progressText.innerHTML = `Add ৳ <strong>${neededForFree}</strong> more for <strong>FREE Express Delivery</strong>!`;
  }

  // Cart List Items
  const cartList = document.getElementById('cartItemsList');
  if (state.cart.length === 0) {
    cartList.innerHTML = `<div style="text-align:center; padding: 40px 10px;">
      <i class="fa-solid fa-basket-shopping text-muted" style="font-size: 3rem;"></i>
      <h4 style="margin-top:10px;">Your cart is currently empty</h4>
      <p style="font-size:0.8rem; color:var(--text-muted);">Explore fresh groceries & add items</p>
    </div>`;
  } else {
    cartList.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='${item.fallbackImg}'">
        <div class="cart-item-info">
          <h5 class="cart-item-title">${item.name}</h5>
          <span class="cart-item-unit">${item.unit}</span>
          <div class="cart-item-price">৳ ${item.price * item.qty}</div>
        </div>
        <div class="qty-control-group" style="height:fit-content;">
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.qty - 1})">-</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.qty + 1})">+</button>
        </div>
      </div>
    `).join('');
  }

  // Price Summary breakdown
  document.getElementById('cartSubtotal').innerText = `৳ ${subtotal}`;
  document.getElementById('cartDeliveryFee').innerText = deliveryFee === 0 ? 'FREE' : `৳ ${deliveryFee}`;
  document.getElementById('cartGrandTotal').innerText = `৳ ${grandTotal}`;

  if (discount > 0) {
    document.getElementById('discountRow').style.display = 'flex';
    document.getElementById('cartDiscount').innerText = `- ৳ ${discount}`;
  } else {
    document.getElementById('discountRow').style.display = 'none';
  }
}

// --- COUPON SYSTEM ---
function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (code === 'SHWAPNO100' || code === 'FRESH20' || code === 'EID2026') {
    state.appliedCoupon = code;
    document.getElementById('appliedCouponBadge').style.display = 'flex';
    document.getElementById('appliedCouponCode').innerText = code;
    updateCartUI();
    showToast(`Coupon ${code} Applied Successfully!`);
  } else {
    showToast('Invalid Coupon Code! Try SHWAPNO100 or FRESH20');
  }
}

function removeCoupon() {
  state.appliedCoupon = null;
  document.getElementById('appliedCouponBadge').style.display = 'none';
  document.getElementById('couponInput').value = '';
  updateCartUI();
  showToast('Coupon removed');
}

// --- WISHLIST SYSTEM ---
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to your wishlist ❤️');
  }
  localStorage.setItem('shwapno_wishlist', JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderProducts();
  renderFlashDeals();
}

function updateWishlistUI() {
  document.getElementById('wishlistBadge').innerText = state.wishlist.length;
}

// --- SEARCH & FILTER ---
function handleSearch(query) {
  state.searchQuery = query;
  renderProducts();

  const dropdown = document.getElementById('searchDropdown');
  if (query.trim().length > 1) {
    const matches = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    if (matches.length > 0) {
      dropdown.style.display = 'block';
      dropdown.innerHTML = matches.map(p => `
        <div class="search-dropdown-item" onclick="openProductModal('${p.id}'); document.getElementById('searchDropdown').style.display='none';">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <strong>${p.name}</strong>
            <div class="text-red">৳ ${p.price}</div>
          </div>
        </div>
      `).join('');
    } else {
      dropdown.style.display = 'none';
    }
  } else {
    dropdown.style.display = 'none';
  }
}

function filterProducts(catId, evt) {
  if (evt) evt.preventDefault();
  state.currentCategory = catId;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  renderProducts();

  // Scroll to product section
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

function sortProducts(sortVal) {
  state.currentSort = sortVal;
  renderProducts();
}

// --- MODAL CONTROLS ---

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = drawer.classList.contains('open');

  if (isOpen) {
    drawer.classList.remove('open');
    overlay.style.display = 'none';
  } else {
    drawer.classList.add('open');
    overlay.style.display = 'block';
  }
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty! Add items to checkout.');
    return;
  }
  toggleCartDrawer(); // Close cart drawer
  document.getElementById('checkoutModal').style.display = 'flex';

  // Render Checkout Summary
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = subtotal >= 1000 ? 0 : 50;
  const grandTotal = subtotal + deliveryFee;

  document.getElementById('checkoutSummaryItems').innerHTML = state.cart.map(item => `
    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
      <span>${item.qty}x ${item.name}</span>
      <strong>৳ ${item.price * item.qty}</strong>
    </div>
  `).join('');

  document.getElementById('checkoutFinalTotal').innerText = `৳ ${grandTotal}`;
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').style.display = 'none';
}

function confirmOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  if (!name || !phone) {
    alert('Please enter your full name and mobile number!');
    return;
  }

  closeCheckoutModal();
  // Clear Cart
  state.cart = [];
  saveCart();
  updateCartUI();
  renderProducts();

  // Generate random order id
  const orderId = '#SHW-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('trackerOrderId').innerText = orderId;

  // Open Live Order Tracker Modal
  document.getElementById('trackerModal').style.display = 'flex';
  showToast(`🎉 Order ${orderId} Placed Successfully!`);
}

function openTrackerModal() {
  document.getElementById('trackerModal').style.display = 'flex';
}

function closeTrackerModal() {
  document.getElementById('trackerModal').style.display = 'none';
}

function openProductModal(productId) {
  const p = products.find(prod => prod.id === productId);
  const modalGrid = document.getElementById('productModalBody');

  modalGrid.innerHTML = `
    <div style="padding:20px; text-align:center;">
      <img src="${p.image}" alt="${p.name}" style="max-width:100%; height:220px; object-fit:contain; border-radius:12px;" onerror="this.src='${p.fallbackImg}'">
    </div>
    <div style="padding:20px;">
      <span class="discount-badge" style="position:static;">${p.badge}</span>
      <h2 style="margin:10px 0 6px 0; font-size:1.4rem;">${p.name}</h2>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${p.description}</p>
      
      <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:16px;">
        <span class="current-price" style="font-size:1.6rem;">৳ ${p.price}</span>
        <span class="old-price" style="font-size:1.1rem;">৳ ${p.oldPrice}</span>
        <span class="text-green" style="font-size:0.85rem; font-weight:700;">${p.discount}</span>
      </div>

      <div class="form-group">
        <label>Select Weight / Pack Size:</label>
        <select class="product-unit-select" style="padding:10px;">
          ${p.unitsAvailable.map(u => `<option value="${u}">${u}</option>`).join('')}
        </select>
      </div>

      <button class="btn btn-yellow" style="width:100%; padding:14px; margin-top:10px;" onclick="addToCart('${p.id}'); closeProductModal();">
        <i class="fa-solid fa-basket-shopping"></i> Add to Basket (৳ ${p.price})
      </button>
    </div>
  `;

  document.getElementById('productModal').style.display = 'flex';
}

function closeProductModal() {
  document.getElementById('productModal').style.display = 'none';
}

function openLocationModal() {
  document.getElementById('locationModal').style.display = 'flex';
}

function closeLocationModal() {
  document.getElementById('locationModal').style.display = 'none';
}

function setDeliveryLocation(locName) {
  state.location = locName;
  localStorage.setItem('shwapno_location', locName);
  document.getElementById('currentLocationText').innerText = locName;
  closeLocationModal();
  showToast(`Delivery area set to ${locName}`);
}

function openCategoryDrawer() {
  document.getElementById('catDrawer').classList.add('open');
  document.getElementById('catDrawerOverlay').style.display = 'block';
}

function closeCategoryDrawer() {
  document.getElementById('catDrawer').classList.remove('open');
  document.getElementById('catDrawerOverlay').style.display = 'none';
}

function open1TakaDeals() {
  alert('৳1 Super Bazar Deal: Add ৳999+ worth of groceries to your cart and claim 1kg Pure Refined Salt for ৳1 at checkout!');
}

function scrollToProducts() {
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

// --- LANGUAGE TOGGLE (EN / BN) ---
function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'bn' : 'en';
  document.getElementById('langEN').classList.toggle('active', state.lang === 'en');
  document.getElementById('langBN').classList.toggle('active', state.lang === 'bn');

  const heroTitle = document.getElementById('heroTitle');
  if (state.lang === 'bn') {
    heroTitle.innerHTML = 'তাজা বাজার পৌঁছে যাবে <br><span class="highlight-yellow">আপনার ঘরে!</span>';
    document.getElementById('heroSubtitle').innerText = '১০০% ভেজালমুক্ত পদ্মার ইলিশ, তাজা শাক-সবজি ও দৈনন্দিন গ্রোসারি ৬০ মিনিটে ডেলিভারি।';
  } else {
    heroTitle.innerHTML = 'Freshness Delivered <br><span class="highlight-yellow">To Your Doorstep!</span>';
    document.getElementById('heroSubtitle').innerText = '100% Organic produce, Padma Hilsa, Fresh Meat & Daily Groceries delivered in under 60 minutes.';
  }
}

// --- THEME TOGGLE ---
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', state.theme);
  const btn = document.getElementById('themeToggleBtn');
  btn.innerHTML = state.theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// --- TIMER FUNCTION ---
function startCountdown() {
  let totalSeconds = 3 * 3600 + 45 * 60 + 28;
  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 4 * 3600;

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    document.getElementById('hours').innerText = String(hrs).padStart(2, '0');
    document.getElementById('minutes').innerText = String(mins).padStart(2, '0');
    document.getElementById('seconds').innerText = String(secs).padStart(2, '0');
  }, 1000);
}

// --- TOAST NOTIFIER ---
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
