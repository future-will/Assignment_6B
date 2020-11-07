/*To DO:
1.  Selecting product datail
	a. product color, relsults in update to the page somehow
	b. product size
	c. quantity
2. add the product to the cart
	a. give indication that a product has been added
3. make the shopping cart editable */
//console.log("hello world");
//creting a product class 
class Product{
	constructor (productName, color, size, price, quantity){
		this.productName = productName;
		this.color = color;
		this.size = size;
		this.price = price;
		this.quantity = quantity;
	}

	getProductPrice(){
		console.log(this.price * this.quantity);
	}
}
//need an array to store the products in the cart 
var cartItems = [];
var cartCounter = 0;

//funtion to pull the values of the product into the cart
function addToCart(){
	//hardcodeding for now, must change later
	var productName = "Dog Harness";
	var price = 200.00;
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
	//creates new product object
	var product = new Product(productName, color, size, price, quantity);
	//adds the new object to the cart array
	cartItems.push(product);

	console.log(productName);
	console.log(price);
	console.log(color);
	console.log(size);
	console.log(quantity);
	console.log("added to cart");

	//need to get the number of items in the cart and pushed to a location outside of this function
	//use quantity to get the qty not the number of items in the cart array
	updateCartCounter(quantity);
}
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
function updateCartCounter(num){
	//js is treating num like a string, IDK why. had to use Number() to convert to an int
	cartCounter = cartCounter + Number(num);
	//check if cartCounter is above 0
	var cartAmount = document.getElementById("cartAmount");
	var cartCount = document.getElementById("cartCount");
	if (cartCounter > 0){
		cartAmount.style.display = "block";
		//passing in the new amount into html
		cartCount.innerHTML = cartCounter;
	} 
	else{
		cartAmount.style.display = "none";
	}
	//update the html with the new cart number
	//innderHTML
	localStorage.setItem("cartCounter", cartCounter);
	console.log("local storage: " + localStorage.getItem("cartCounter"));
	//for write up, problem if you added the item two times with same parameter, would not combine those qts, would show 2 separate lines in cart

}
function moveCartItems(){
	window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
			console.log("checking size");
		}	
	}
	//loops through colors to make sure one is checked
	for (var i = 0; i < colors.length; i++) {
		if(colors[i].checked){
			colorCheck = true;
			console.log("checking color");
		}
			
	}
	//checks to see is the input typp number for quantity has at least one
	if (quantity >= 1){
		qntCheck = true;
		console.log("checking qty");
	}
	//check all booleans are true then removes the diasbled attribute of the cart button
	if (sizeCheck && colorCheck && qntCheck){
		document.getElementById("addToCart").disabled = false;
		console.log("size true");
	}
 
}

//holy shit it works!!
//let test = new Product("prod", "red", "large", 20, 2);



