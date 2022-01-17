//Framework de nodejs
const express = require('express')
//Definicion del router
const router = express.Router()
//Definicion del pool sql
const pool = require('../src/database');
const mockCategorias = require('../mocks/mockCategorias');
//Nos trae el metodo para hacer querys a la BD
//Definicion de la ruta
router.get('/categories', async (req, res, next) => {
  // Ruta para listar las categorias
  // Aqui va el query para listar las categorias
  if(process.env.NODE_ENV === 'production'){
    const categories = await pool.query('SELECT * FROM heroku_b3e0382f6ba83ba.categoria');
  
    //Respuesta a la peticion
    res.status(200).json({
      categories
    })
  }else if (process.env.NODE_ENV === 'test'){
    const categories = mockCategorias;
    //Respuesta a la peticion
    res.status(200).json({
      categories
    })
  }
  
})

router.get('/categories/:cat_id', async (req, res, next) => {
  // Ruta para listar las categorias

  const { cat_id } = req.params
  if(process.env.NODE_ENV === 'production'){
    // Aqui va el query para listar las categorias
    const categories = await pool.query('SELECT * FROM heroku_b3e0382f6ba83ba.categoria WHERE categoria_id = ?', [cat_id]);
  
    //Respuesta a la peticion
    res.status(200).json({
      categories
    })
  } else if (process.env.NODE_ENV === 'test'){
    const categories = mockCategorias.filter(categoria => categoria.categoria_id === cat_id);
    //Respuesta a la peticion
    res.status(200).json({
      categories
    })
  }

})
//exportacion del router
module.exports = router