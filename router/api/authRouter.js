const { Router } = require("express");

const authController = require("../../controllers/AuthController"); // path to controller

const router = Router();

/**
 * @swagger
 * definitions:
 *   users:
 *     required:
 *       - id
 *       - email
 *       - password
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
  * @swagger
  * /register:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: body
  *       in: body
  *       description: sign up using email and password
  *       required: true
  *       schema:
  *         type: object
  *         required:
  *           - email
  *           - password
  *         properties:
  *           email:
  *             type: string
  *           password:
  *             type: string
  *     responses:
  *       201:
  *          description: send an email to the user with the auto generated password and register him
  */

router.post("/register", authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: JWT
 *       in: header
 *       description: fire base cloud messaging token
 *       required: true
 *       type: string
 *     - name: platform
 *       in: header
 *       description: the platform that the user is using to access the system ios/android
 *       required: true
 *       type: string
 *     - name: body
 *       in: body
 *       description: the login credentials
 *       required: true
 *       schema:
 *         type: object
 *         required:
 *           - email
 *           - password
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *     responses:
 *       200:
 *         description: user logged in succesfully
 */

router.post("/login", authController.login);

module.exports = router;
