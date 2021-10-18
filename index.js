/* 
    Frontend 1 - Javascript // Nackademin // Individual task - Store front
    
    @author Zamir Cohen
    
---------------------------------------------------------------------------*/




        const url = "https://mock-data-api.firebaseio.com/webb21/products.json"

        // Defines all global variables
        let total = 0
        let rateInput = 0
        let minPriceInput = 0
        let maxPriceInput = 999999
        const totalMessage = document.getElementById("total")
        totalMessage.innerText = "Total: 0kr" 

        const productContainer = document.getElementById("products")
        const shoppingContainer = document.getElementById("shopping")

        const filterButton = document.getElementById("filterButton")
        const userRating = document.getElementById("rating")

        // Function for pushing the filter button
        function handleOnClick(){
            const userInput = document.getElementById("rating")
            const rating = userInput.value
            
            const userInputminPrice = document.getElementById("minPrice")
            const userInputmaxPrice = document.getElementById("maxPrice")

            const userMinPrice = userInputminPrice.value
            const userMaxPrice = userInputmaxPrice.value

            const errorMessage = document.getElementById("errorMessage")

            if(rating < 0 || rating > 5 || userMinPrice < 0 || userMaxPrice < 0){
                errorMessage.innerText = "Please insert valid values"
            }else 
            
            errorMessage.innerText = ""
            document.getElementById("products").innerHTML = ""                 // Clears the productlist
            getMessageList(rating, userMinPrice, userMaxPrice)
        }


        // Function for pushing the delete cart button
        function deleteCartOnClick(){
            total = 0
            const deleteShopping = document.getElementById("shopping")
            deleteShopping.innerText = ""
            totalMessage.innerText = "Total: 0kr"
            return total = 0
        }



            function renderArticleItem(item, rating, minPrice, maxPrice) {

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

                const buyButton = document.createElement("button")
                buyButton.innerText = `Buy`

                const divider = document.createElement("hr")

                buyButton.addEventListener("click", function() {
                    total += item.price
                    totalMessage.innerText = `Total: ${total}kr`

                    const shoppingList = document.createElement("p")
                    shoppingList.innerText = `${item.name} - ${item.price}kr`
                    
                    shoppingContainer.appendChild(shoppingList)
                })

                const image = document.createElement("img")
                image.src = item["images"]["0"]["src"]["small"]
                image.alt = item["images"]["0"]["alt"]
                image.width = "300"

                image.addEventListener("click", function() {                        
                    total += item.price
                    totalMessage.innerText = `Total: ${total}kr`
                    const shoppingList = document.createElement("p")
                    shoppingList.innerText = `${item.name} - ${item.price}kr`
                    shoppingContainer.appendChild(shoppingList)
                })


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



        function renderArticleList(articleList, rating, minPrice, maxPrice) {
            articleList.forEach(articleItem => {
                renderArticleItem(articleItem, rating, minPrice, maxPrice)
            })
        }            


        function getMessageList(rating, minPrice, maxPrice) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            renderArticleList(data, rating, minPrice, maxPrice)
        })    
    }

   getMessageList(rateInput, minPriceInput, maxPriceInput)
