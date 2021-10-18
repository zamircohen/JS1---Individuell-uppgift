/* 
    Frontend 1 - Javascript // Nackademin // Individual task - Store front
    
    @author Zamir Cohen
    
---------------------------------------------------------------------------*/

        // Define all global variables
        const url = "https://mock-data-api.firebaseio.com/webb21/products.json"

        let total = 0
        let rateInput = 0
        let minPriceInput = 0
        let maxPriceInput = 999999
        const totalMessage = document.getElementById("total")
        totalMessage.innerText = "Total: 0kr" 

        const productContainer = document.getElementById("products")
        const shoppingContainer = document.getElementById("shoppingList")
        const filterButton = document.getElementById("filterButton")
        const userRating = document.getElementById("rating")
        const errorMessage = document.getElementById("errorMessage")

        // Function for the filter button
        function filterOnClick(){
            const userInput = document.getElementById("rating")
            const rating = userInput.value
            const userInputminPrice = document.getElementById("minPrice")
            const userMinPrice = userInputminPrice.value
            const userInputmaxPrice = document.getElementById("maxPrice")
            const userMaxPrice = userInputmaxPrice.value

            if(rating < 0 || rating > 5 || userMinPrice < 0 || userMaxPrice < 0 || userMinPrice > userMaxPrice){
                errorMessage.innerText = "Please insert valid values"
            }else 
            
            errorMessage.innerText = ""
            document.getElementById("products").innerHTML = ""                 // Clears the productlist
            getProductList(rating, userMinPrice, userMaxPrice)
        }

        // Function for the delete cart button
        function deleteCartOnClick(){
            total = 0
            const deleteShopping = document.getElementById("shoppingList")
            deleteShopping.innerText = ""
            totalMessage.innerText = "Total: 0kr"
            return total = 0
        }

            // Function for rendering the correct articles with parameters from the filter input
            function renderProductItem(item, rating, minPrice, maxPrice) {

                const productName = document.createElement("h3")
                productName.innerText = item.name

                const productDescription = document.createElement("p")
                productDescription.innerText = item.description

                const productPrice = document.createElement("p")
                productPrice.innerText = `Price: ${item.price}kr`

                const productRating = document.createElement("i")
                productRating.innerText = `Rating: ${item.rating}/5`

                const productStock = document.createElement("p")
                productStock.innerText = `In stock: ${item.stock}`

                const divider = document.createElement("hr")

                const image = document.createElement("img")
                image.src = item["images"]["0"]["src"]["small"]
                image.alt = item["images"]["0"]["alt"]
                image.width = "300"
                image.addEventListener("click", function() {                        
                    addToCartWithClick()
                })

                const buyButton = document.createElement("button")
                buyButton.innerText = `Buy`
                buyButton.addEventListener("click", function() {
                    addToCartWithClick()
                })

                function addToCartWithClick() {
                    total += item.price
                    totalMessage.innerText = `Total: ${total}kr`
                    const shoppingList = document.createElement("p")
                    shoppingList.innerText = `${item.name} - ${item.price}kr`
                    shoppingContainer.appendChild(shoppingList)
                }    
                
                if(item.rating >= rating && item.price >= minPrice && item.price <= maxPrice){
                productContainer.appendChild(productName)
                productContainer.appendChild(image)
                productContainer.appendChild(productDescription)
                productContainer.appendChild(productPrice)
                productContainer.appendChild(productRating)
                productContainer.appendChild(productStock)
                productContainer.appendChild(buyButton)
                productContainer.appendChild(divider)   
                }
            }

        // Renders a product list by going through each product with the user input as parameters
        function renderProductList(articleList, rating, minPrice, maxPrice) {
            articleList.forEach(articleItem => {
                renderProductItem(articleItem, rating, minPrice, maxPrice)
            })
        }            

        // Gets the products by fetching them and forwarding them with the correct parameters    
        function getProductList(rating, minPrice, maxPrice) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            renderProductList(data, rating, minPrice, maxPrice)
        })    
    }

   getProductList(rateInput, minPriceInput, maxPriceInput)
