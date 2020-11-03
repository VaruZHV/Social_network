const lowDb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
let db
const createConnectionLowdb = () => {
    let index = 0
    db = lowDb(new FileSync('db.json'))
    db.defaults({
        items: [
            {
                id: index++,
                Followed: false,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'serjik a',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },

            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'hrantik b',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'varujik c',
                status: 'lav-txa',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: false,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'serjik d',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },

            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'hrantik e',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'varujik f',
                status: 'lav-txa',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: false,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'serjik g',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },

            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'hrantik h',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'varujik j',
                status: 'lav-txa',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: false,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'serjik k',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },

            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'hrantik l',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'varujik m',
                status: 'lav-txa',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: false,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'serjik o',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },

            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'hrantik n',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'varujik q',
                status: 'lav-txa',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: false,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'serjik r',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },

            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'hrantik s',
                status: 'hzor',
                location: { country: 'Armenia', city: 'yerevan' }
            },
            {
                id: index++,
                Followed: true,
                photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
                Fullname: 'varujik t',
                status: 'lav-txa',
                location: { country: 'Armenia', city: 'yerevan' }
            }
        ],
        totalCount: 18
    }).write()
}

const getConection = ()=>db
module.exports = {
    createConnectionLowdb,
    getConection
}