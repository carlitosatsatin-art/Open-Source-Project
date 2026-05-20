function editProfile() {
    alert("Edit Profile button clicked!");
    window.location.href = "edit-profile.html";
}

function editAddress() {
    alert("Edit Address button clicked!");
    window.location.href = "edit-address.html";
}

function clearNotifications() {

    if(confirm("Clear all notifications?")) {
        alert("Notifications cleared.");
    }

}

function logoutUser() {

    if(confirm("Are you sure you want to logout?")) {

        alert("Logged out successfully.");
        window.location.href = "login.html";

    }

}
// CART

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

updateCartCount();

function addToCart(name,price,image){

let item =
cart.find(
p => p.name===name
);

if(item){

item.qty++;

}else{

cart.push({
name,
price,
image,
qty:1
});

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert(name + " added to cart!");

}

function updateCartCount(){

let count =
cart.reduce(
(total,item)=>
total + item.qty,
0
);

let cartCount =
document.getElementById(
"cartCount"
);

if(cartCount){

cartCount.innerText = count;

}

}

// SEARCH

function searchProduct(){

let input =
document.getElementById(
"searchInput"
).value.toLowerCase();

let cards =
document.querySelectorAll(
".product-card"
);

cards.forEach(card=>{

let text =
card.innerText.toLowerCase();

card.style.display =
text.includes(input)
? "block"
: "none";

});

}
// DISPLAY CART

function displayCart(){

let container =
document.getElementById(
"cartItems"
);

let total = 0;

if(!container) return;

container.innerHTML = "";

cart.forEach((item,index)=>{

total +=
item.price *
item.qty;

container.innerHTML += `

<div class="cart-item">

<div class="cart-left">

<img src="${item.image}">

<div>

<h3>${item.name}</h3>

<p>
$${item.price}
</p>

</div>
</div>

<div class="cart-controls">

<button
class="qty-btn"
onclick="changeQty(${index},-1)">
-
</button>

<span>${item.qty}</span>

<button
class="qty-btn"
onclick="changeQty(${index},1)">
+
</button>

<button
class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>
`;

});

document.getElementById(
"cartTotal"
).innerText = total;

}

// CHANGE QTY

function changeQty(index,amount){

cart[index].qty += amount;

if(cart[index].qty <=0){

cart.splice(index,1);

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();
updateCartCount();

}

// REMOVE

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();
updateCartCount();

}

// CHECKOUT

function goCheckout(){

if(cart.length===0){

alert(
"Cart is empty!"
);

return;

}

window.location.href =
"order.html";

}