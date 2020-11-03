import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true
})

export const usersApi = {
    getUsers(currentPage, pageSize) {
        return instance.get(`/users&currentpage=${currentPage}userscount=${pageSize}`)
            .then(response => {
                return response.data
            })

    },
    follow(userId) {
        return instance.post(`/follow/${userId}`, {})
    },
    unFollow(userId) {
        return instance.delete(`/follow/${userId}`)
    },
}
export const ProfileApi = {
    getUser(userId){
        return instance.get(`/profile/${userId}`)
    },
    putStatus(status){
        return instance.put('/profile/status',{status})
    },
    putPhoto(photo){
        var formData = new FormData()
        formData.append("photo", photo)

        return instance.put('/profile/ChangeAvatar',formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    },
    changeUserData(userData){
        return instance.put('/profile/changeUserData',userData)
    }
}
export const authApi = {
    getId(){
        return  instance.get(`/me`)
    },
    login({login, password, rememberMe = false}){
        return instance.post('/login',{login,password,rememberMe})
    },
    loginOut(){
        return instance.delete('/login')
    }

}