
const ApiBase = 'http://127.0.0.1:8000/api'

interface produxtidprops {
    id?: string,
}

interface commentprops {
    Comment: string,
    ReviewID: string,
    UserID: string,
    ProductID: string,
    Rating: string,
    ReviewDate: string
}

interface dataprops {
    ProductID: string,
    SellerID: string,
    ProductName: string,
    Description: string,
    Price: string,
    StockQuantity: string,
    Category: string,
    url: string
}


const API = {
    verifylogin: async (email: string, password: string) => {
        const formData = new FormData()

        formData.append('email', email)
        formData.append('password', password)


        await fetch(ApiBase + "/verifylogin", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                localStorage.removeItem("error")
                localStorage.removeItem("userid")
                localStorage.removeItem("userName")
                let userinfo = data
                if (userinfo.error != 'error') {
                    console.log(userinfo)
                    localStorage.setItem('userid', userinfo.userId)
                    localStorage.setItem('userName', userinfo.firstName)
                } else {
                    localStorage.removeItem("userid")
                    localStorage.setItem('error', "error")
                    localStorage.removeItem("userName")
                }
            })

    },

    userRegister: async (formData: FormData) => {
        var success = false

        await fetch(ApiBase + "/userRegister", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                success = data.success
            })

        return success
    },

    addProduct: async (formData: FormData) => {
        var success = false

        await fetch(ApiBase + "/saveproduct", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                success = data.success
                console.log(success)
            })

        return success
    },

    editProduct: async (formData: FormData) => {
        var success = false

        await fetch(ApiBase + "/editproduct", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                success = data.success
                console.log(success)
            })

        return success
    },

    searchProduct: async (name: String) => {
        return await fetch('http://127.0.0.1:8000/api/getProductByName/' + name)
    },

    seleReport: async (userid: String) => {
        return await fetch(ApiBase + '/sales_report/' + userid);
    },

    get_roduct: async (id: string) => {
        await fetch(ApiBase + "/product/" + id, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data
            })

        return []
    },

    saveComment: async (formData: FormData) => {
        var success = false

        await fetch(ApiBase + "/saveComment", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                success = data.success
            })

        return success
    },
    getAllComment: async () => {
        await fetch(ApiBase + "/getAllComment", {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then((data: commentprops[]) => {
                console.log(data)
                return data
            })

        return []
    },

    deleteComment: async (id: string) => {
        var success = false

        const formData = new FormData()
        formData.append('commentid', id)

        await fetch(ApiBase + "/DeleteComment", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                success = data.success
            })

        return success

    },

    deleteProduct: async (id: string) => {
        var success = false

        const formData = new FormData()
        formData.append('productid', id)

        await fetch(ApiBase + "/DeleteProduct", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                success = data.success
            })

        return success
    },

    deleteOrder: async (id: string, id2: string) => {
        var success = false

        const formData = new FormData()
        formData.append('orderid', id)
        formData.append('orderitemid', id2)


        await fetch(ApiBase + "/Deleteorder", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                success = data.success
            })

        return success
    },

    editComment: async (formData: FormData) => {
        var success = false

        await fetch(ApiBase + "/editComment", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                success = data.success
            })

        return success
    },

    createOrder: async (formData: FormData) => {
        var success

        await fetch(ApiBase + "/createOrder", {
            method: 'POST',
            body: formData
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                success = data
            })

        return success
    },

}

export default API

