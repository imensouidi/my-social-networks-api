const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");
const { registerValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validator.middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           example: Imen
 *         lastname:
 *           type: string
 *           example: Souidi
 *         email:
 *           type: string
 *           example: imen@test.com
 *         password:
 *           type: string
 *           example: 123456
 *
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: imen@test.com
 *         password:
 *           type: string
 *           example: 123456
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/register", registerValidator, validate, ctrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Token JWT retourné
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", ctrl.login);

module.exports = router;
