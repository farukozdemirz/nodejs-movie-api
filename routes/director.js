const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Models 
const Director = require('../Models/Director');

router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })

})

router.get('/', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
            //Şuan yönetmenin filmleri ayrı ayrı gösteriliyor tek bir arrayde gösterilmesi için gruplama işlemini yapılması gerekmekte.
        },
        {
            //hangi verileri almak istiyor isek onları yazıyoruz:
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                //Dönen datayı tek bir objede toplamak için puşt methodu kullanılır
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            // Listelenmesini istediğimiz bilgilerin başlıklarını ve formatını belirliyoruz.şuan _id başlığı içerisinde geliyor
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })

})
router.get('/:director_id', (req, res, next) => {
    //Sadece 1 kullanıcı yani 1 yönetmene ait verileri çekmek için ; 
    const promise = Director.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
            //Şuan yönetmenin filmleri ayrı ayrı gösteriliyor tek bir arrayde gösterilmesi için gruplama işlemini yapılması gerekmekte.
        },
        {
            //hangi verileri almak istiyor isek onları yazıyoruz:
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                //Dönen datayı tek bir objede toplamak için puşt methodu kullanılır
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            // Listelenmesini istediğimiz bilgilerin başlıklarını ve formatını belirliyoruz.şuan _id başlığı içerisinde geliyor
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })

})
module.exports = router;
