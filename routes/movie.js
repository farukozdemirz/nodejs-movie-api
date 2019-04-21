const express = require('express');
const router = express.Router();

// Models
const Movie = require('../Models/Movie');


router.post('/', async (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body; 
  //ASYNC AWAIT ÖRNEK 
  const movie = new Movie(req.body);
  try {
    const data = await movie.save();
    res.json(data)
  } catch (error) {
    res.json(error)
  }

});

//Film listeleme
router.get('/', async (req, res) => {
  //PROMISE YAPISI ÖRNEK
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});

// Top 10 list

router.get('/top10', async (req, res) => {
  //PROMISE YAPISI ÖRNEK
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});

//Film detay

router.get('/:movie_id', (req, res, next) => {
  //Id almak için .params kullanılır params / dan sonraki değeri döndürür
  const promise = Movie.findById(req.params.movie_id)
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.json(err)
  });
});


//Film güncelleme
router.put('/:movie_id', (req, res, next) => {
  //Id almak için .params kullanılır params / dan sonraki değeri döndürür
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.json(err)
  });
});

// Film Silme

router.delete('/:movie_id', (req, res, next) => {
  //Id almak için .params kullanılır params / dan sonraki değeri döndürür
  const promise = Movie.findByIdAndRemove(req.params.movie_id)
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.json(err)
  });
});


//Between
router.get('/between/:start_year/:end_year', async (req, res) => {
  //$gte kücük veya eşit $lte büyük veya eşit ise anlamına gelir.
  const { start_year, end_year } = req.params;
  const promise = Movie.find(
    {
      year: { '$gte': parseInt(start_year), '$lte': parseInt(end_year) }
    }
  );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});


module.exports = router;
