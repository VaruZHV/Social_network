const { Router } = require('express')
const router = Router()
const fs = require('fs');
const path = require("path")
const { getConection } = require('./db/lowdb')


//router for creating pagination
router.get('/users&currentpage=:id?userscount=:number', (req, res) => {
    console.log(req.params.id, 'it s users');
    let newData = []

    let sliceFirstParam = 0

    let loopCount = Math.ceil(getConection().get('totalCount').value() / req.params.number)
    for (let i = 0; i < loopCount; i++) {
        newData.push(getConection().get('items').value().slice(sliceFirstParam, sliceFirstParam + parseInt(req.params.number)))
        sliceFirstParam += parseInt(req.params.number)
    }
    let realData = {
        items: newData[parseInt(req.params.id - 1)],
        totalCount: getConection().get('totalCount').value()
    }
    res.json(realData)

})

router.post('/follow/:id', (req, res) => {

    getConection().get('items')
        .find({ id: parseInt(req.params.id) })
        .assign({ Followed: false })
        .write()
    res.send(false)
})

router.delete('/follow/:id', (req, res) => {
    getConection().get('items')
        .find({ id: parseInt(req.params.id) })
        .assign({ Followed: true })
        .write()
    res.send(true)
})
 
router.get('/profile/?:id', (req, res) => {
    if (req.cookies.id) {
        let userId = !req.params.id ? req.cookies.id : req.params.id
        if (userId) {
            let userData = getConection().get('items').find({ id: parseInt(userId) }).value()
            if (userData.id === parseInt(req.cookies.id)) {
                console.log(userData.id, req.cookies.id, "ids")
 
                return res.send([{ ...userData, isOwner: true }])
            }
            res.send([{ ...userData, isOwner: false }])
        } else {
            res.status(500).send("something was wrong")
            console.log(userId, "something was wrong")
        }

 
    } else res.status(500).send("something was wrong")
})

// 1 year = 31536000
router.get('/me', (req, res) => {
    console.log(req.cookies.id)
    if (req.cookies.id) {
        res.json({
            id: req.cookies.id,
            login: "var",
            password: "lavtxa",
            rememberMe: false,
            isAuth: true
        })
    } else {
        res.json({
            id: null,
            login: null,
            password: null,
            rememberMe: null,
            isAuth: null        
        })
    }

})

router.post('/login', (req, res) => {
    res.cookie('id', '2', {
        maxAge: 31556952000,
        httpOnly: true,
        secure: false
    })

    res.json({
        id: 2,
        login: req.body.login,
        rememberMe: false,
        isAuth: true
    })
})

router.delete('/login', (req, res) => {
    res.clearCookie('id');
    res.send("cookies has cleared")
})


router.put('/profile/status', (req, res) => {

    let id = req.cookies.id
    let user = getConection().get('items')
    .find({ id: parseInt(id) })
    .assign({ status: req.body.status})
    .write()
    console.log(id, user);
    res.json(user)
})

router.put('/profile/changeUserData', (req, res) => {

    let id = req.cookies.id
    let user = getConection().get('items')
    .find({ id: parseInt(id) })
    .assign({ ...req.body})
    .write()
    res.json(user)
}) 

router.put('/profile/ChangeAvatar', (req, res) => {

    const { photo } = req.files
    photo.extname = path.extname(photo.name);
    const filename = photo.md5 + photo.extname
    const filepath = path.resolve(__dirname, '../public/avatars', filename)
    console.log(filepath,"paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaath",filename)
    fs.writeFileSync(filepath, photo.data)
    res.send(filename)
})



module.exports = router


//govnocode by var 
