//var express = require('express');
import express from 'express';
import userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authJWT.js';
var router = express.Router();

//app.js prefix: /users
router.get('/', userController.getAll); // Összes felhasználó lekérése
router.get('/test', authenticateToken, userController.test); // Test endpoint
router.post('/refresh-token', userController.refreshToken); // Refresh token endpoint
router.post('/logout', userController.logout); // POST-tal történő kijelentkezés
router.get('/logout', userController.logout); // GET-tal történő kijelentkezés
router.get('/profil', authenticateToken, userController.getProfile); // Saját profil

router.post('/reg', userController.create); // Új felhasználó hozzáadása
router.post('/', userController.create); // Régi URL megtartása
router.post('/login', userController.login); // Login
router.get('/:id', userController.getById); // Felhasználó lekérése ID alapján


export default router;
