
const ApiBase = 'http://127.0.0.1:8000/api'

interface produxtidprops{
    id? : string,
}

interface commentprops {
    Comment: string,
    ReviewID: string,
    UserID: string,
    ProductID: string,
    Rating: string,
    ReviewDate: string
}

const API = {

    verifylogin: async (email: string, password: string) => {
        const formData = new FormData()

        formData.append('email', email)
        formData.append('password', password)

    
        await fetch(ApiBase + "/verifylogin",{
            method:'POST',
            body: formData
        })
        .then(response =>{
            return response.json();
                })
            .then(data =>{
                localStorage.removeItem("error")
                localStorage.removeItem("userid")
                localStorage.removeItem("userName")
                let userinfo = data
                if(userinfo.error != 'error'){
                    console.log(userinfo)
                    localStorage.setItem('userid', userinfo.userId)
                    localStorage.setItem('userName', userinfo.firstName)
                }else{
                    localStorage.removeItem("userid")
                    localStorage.setItem('error', "error")
                    localStorage.removeItem("userName")
                }
            })

    },

    userRegister: async (formData: FormData) => {

        var success = false

        await fetch(ApiBase + "/userRegister",{
            method:'POST',
            body: formData
        })
        .then(response =>{
            return response.json();
                })
                .then(data =>{
                    success = data.success
                })
           
        return success
    },

    addProduct: async (formData: FormData) => {

        var success = false

        await fetch(ApiBase + "/saveproduct",{
            method:'POST',
            body: formData
        })
        .then(response =>{
            return response.json();
                })
                .then(data =>{
                    success = data.success
                    console.log(success)
                })
           
        return success
    },

    get_roduct: async (id:string) => {

        await fetch(ApiBase + "/product/"+id,{
            method:'GET',
        })
        .then(response =>{
            return response.json();
                })
                .then(data =>{
                    return data
                })
           
        return []
    },

    saveComment: async (formData: FormData) => {

        var success = false

        await fetch(ApiBase + "/saveComment",{
            method:'POST',
            body: formData
        })
        .then(response =>{
            return response.json();
                })
                .then(data =>{
                    success = data.success
                })
           
        return success
    },
    getAllComment: async () => {

        await fetch(ApiBase + "/getAllComment",{
            method:'GET',
        })
        .then(response =>{
            return response.json();
                })
                .then((data: commentprops[]) =>{
                    console.log(data)
                    return data
                })
           
        return []
    },

    deleteComment: async (id:string) =>{

        var success = false

        const formData = new FormData()
        formData.append('commentid', id)
        
        await fetch(ApiBase + "/DeleteComment",{
            method:'POST',
            body: formData
        })
        .then(response =>{
            return response.json();
                })
                .then(data =>{
                    console.log(data)
                    success = data.success
                })
           
        return success

    },

    editComment: async (formData: FormData) => {

        var success = false

        await fetch(ApiBase + "/editComment",{
            method:'POST',
            body: formData
        })
        .then(response =>{
            return response.json();
                })
                .then(data =>{
                    success = data.success
                })
           
        return success
    },


}

export default API

