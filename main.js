
class Product{
	constructor (productName, color, size, price, quantity, imageSource){
		this.productName = productName;
		this.color = color;
		this.size = size;
		this.price = price;
		this.quantity = quantity;
		//added the image as part of the object to carry over to the cart page
		this.imageSource = imageSource;
	}
	getProductPrice(){
		console.log(this.price * this.quantity);
	}
}
//need an array to store the products in the cart 
var cartItems = [];

function onLoad(){
	//everytime the page is loaded we will loop through the cart items, add quantity and display next to cart icon and call a funct to update the cart array 
	if (localStorage.getItem("cartItems")){
		//only happens if there are items in local storage
		var newCartItems = JSON.parse(localStorage.getItem("cartItems"));
		var cartTotal = 0;
		var cartAmount = document.getElementById("cartAmount");
		var cartCount = document.getElementById("cartCount");
			for (var i = 0; i < newCartItems.length; i++) {
				var item = newCartItems[i];
				cartTotal = cartTotal + Number(item.quantity);

			}
			cartAmount.style.display = "block";
			cartCount.innerHTML = cartTotal;
	}
	else{
		cartAmount.style.display = "none";
	}
	//call a function to update the array of cart items
	upadetCartItemsOnLoad()
}

function upadetCartItemsOnLoad(){
	var cartItemsOnLoad = JSON.parse(localStorage.getItem("cartItems"));
	//pass the current localstorage into an array so that local storage can be accurately updated when an item is appended to the array
	cartItems = cartItemsOnLoad;
}
//funtion to pull the values of the product into the cart
function addToCart(){
	var productName = document.getElementById("mainTitle").innerHTML;
	var price = document.getElementById("mainPrice").innerHTML;;
	var quantity = document.getElementById("qty").value;
	var colors = document.getElementsByName("color");
	var color;
	//looping through the array of radio buttons to find the checked slection
	for (var i = 0; i < colors.length; i++){
		//check if checked
		if(colors[i].checked){
			color = colors[i].value;
		}
	}
	var sizes = document.getElementsByName("size");
	var size;
	//looping through the array of radio buttons to find the checked slection... again
	for (var i = 0; i < sizes.length; i++){
		//check if checked
		if(sizes[i].checked){
			size = sizes[i].value;	
		}
	}
	//grab the cuurent product image
	var imageSource = document.getElementById("mainImage").src;
	//creates new product object
	var product = new Product(productName, color, size, price, quantity, imageSource);
	//adds the new object to the cart array
	cartItems.push(product);
	//add the new array to loacal storage 
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
	//move directly to the cart when item is added
	window.location.replace("cart.html");
}

//need a function to check if all required fields are filled in to allow useres to activate the add to cart button
function fieldsCheck(){
	//these will be the values to change to determine if all fields are complete
	console.log("running check");
	var sizes = document.getElementsByName("size");
	var sizeCheck = false;
	var colors = document.getElementsByName("color");
	var colorCheck = false;
	var quantity = document.getElementById("qty").value;
	var qntCheck = false;
	//loops throuigh sizes to see if one is checked
	for (var i = 0; i < sizes.length; i++) {
		if(sizes[i].checked){
			sizeCheck = true;
		}	
	}
	//loops through colors to make sure one is checked
	for (var i = 0; i < colors.length; i++) {
		if(colors[i].checked){
			colorCheck = true;
		}
			
	}
	//checks to see is the input typp number for quantity has at least one
	if (quantity >= 1){
		qntCheck = true;
	}
	//check all booleans are true then removes the diasbled attribute of the cart button
	if (sizeCheck && colorCheck && qntCheck){
		document.getElementById("addToCart").disabled = false;
	}
}
//parsing the localstorage stuff for when the cart page is loaded, different b/c not showing number of items in cart icon and adding HTML
function pageLoadCart() {
	var newCartItems = JSON.parse(localStorage.getItem("cartItems"));
	console.log(newCartItems);
	var cart = document.getElementById("cartList");
	var totalPrice = 0;
	//looping the new arraray and creating the html using the paramters above
	for (var i = 0; i < newCartItems.length; i++) {
		var item = newCartItems[i];
		cart.innerHTML += "<div class=\"cartItem\" id=\"cartItem" + i + "\"><div class=\"cartItemMain\"><img src=\"" + item.imageSource + "\" alt=\"dogharness\" class=\"cartItemImage\"><div class=\"cartItemMainDetails\"><h2 class=\"cartItemName\" onclick=\"navBack()\"> " + item.productName + "</h2><h3 class=\"cartItemDetails\"><span class=\"cartItemColor\">" + item.color + "</span> | <span class=\"cartItemSize\">" + item.size + "</span></h3></div></div><h3 class=\"cartItemQuantity\">" + item.quantity + "</h3><h3 class=\"cartItemPrice\"><span class=\"cartItemPriceNum\">$" + (Number(item.price) * Number(item.quantity)) + "</span></h3><div class=\"remove\" onclick=\"removeCartItem(" + i + ")\"><img src=\"icons/remove.png\" alt=\"remove button\" class=\"removeButton\"><h3>Remove</h3></div></div>";
		//while looping the total is being calculateed and used later
		totalPrice = totalPrice + (Number(item.price) * Number(item.quantity));
	}
	//update the total price
	var totalPriceList = document.getElementById("totalPriceNum");
	totalPriceList.innerHTML = totalPrice;
}
// function for removing items forom the cart
function removeCartItem(num){
	var removeItem = Number(num);
	var newCartItems = JSON.parse(localStorage.getItem("cartItems"));
	//use splice to remove a specific item from array
	var removed = newCartItems.splice(removeItem,1);
	//updates the locat storage
	localStorage.setItem("cartItems", JSON.stringify(newCartItems));
	//reloads the window to reflect the change
	window.location.reload();
}
//test functions:
function checkCart(){
	console.log(localStorage.getItem("cartItems"));
}
function navBack(){
	window.location.replace("productDetail.html");
}
//overly complicated function to change the image when selecting a color
function strawberrySelect(){
	console.log("strawberrySelect");
	document.getElementById("mainImage").src = "images/strawberrySelect.png";
	document.getElementById("smallImage1").src = "productListImages/productDetailDogHarness2.png";
	document.getElementById("smallImage2").src = "productListImages/productDetailDogHarness3.png";
	document.getElementById("smallImage3").src = "productListImages/productDetailDogHarness4.png";
	document.getElementById("smallImage4").src = "images/mainimageSmall.png";
}
function blackberrySelect(){
	console.log("blackberrySelect");
	document.getElementById("mainImage").src = "images/blackberrySelect.png";
	document.getElementById("smallImage1").src = "images/mainimageSmall.png";
	document.getElementById("smallImage2").src = "productListImages/productDetailDogHarness3.png";
	document.getElementById("smallImage3").src = "productListImages/productDetailDogHarness4.png";
	document.getElementById("smallImage4").src = "productListImages/productDetailDogHarness5.png";
}
function crazyberrySelect(){
	console.log("crazyberrySelect");
	document.getElementById("mainImage").src = "images/crazyberrySelect.png";
	document.getElementById("smallImage1").src = "productListImages/productDetailDogHarness2.png";
	document.getElementById("smallImage2").src = "images/mainimageSmall.png";
	document.getElementById("smallImage3").src = "productListImages/productDetailDogHarness4.png";
	document.getElementById("smallImage4").src = "productListImages/productDetailDogHarness5.png";
}
function fireOrangeSelect(){
	console.log("crazyberrySelect");
	document.getElementById("mainImage").src = "images/fireOrangeSelect.png";
	document.getElementById("smallImage1").src = "productListImages/productDetailDogHarness2.png";
	document.getElementById("smallImage2").src = "productListImages/productDetailDogHarness3.png";
	document.getElementById("smallImage3").src = "images/mainimageSmall.png";
	document.getElementById("smallImage4").src = "productListImages/productDetailDogHarness5.png";
}



