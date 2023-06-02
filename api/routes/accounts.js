const express = require('express');
const router = express.Router();

const createService = require('../services/create');
const retrieveService = require('../services/retrieve');



/**
 * @swagger
 * /account/createUsers:
 *  post:
 *    description: Use To create User
 *    responses:
 *      '200':
 *        description: A successful response..
 */
router.post('/createUsers', async (req, res, next) => {
    const {username, password} = req.body;

   const reuslt =  await createService.Create(username, password);
   
   if (reuslt) {
    res.status(200).json({
        message: "successfully Created!"
    })
   } else {
    res.status(500).json({
        message: "Something Went Wrong!"
    })
   }
})

/**
 * @swagger
 * /account/retrieveUsers:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response..
 */
router.get('/retrieveUsers', async (req, res, next) => {

   const reuslt = await retrieveService();

   if (reuslt) {
    res.status(200).json({
        message: "Successfully Retrieved!",
        result: reuslt
    })
   }else {
    res.status(500).json({
        message: "Something Went Wrong!"
    })
   }
})

module.exports = router;