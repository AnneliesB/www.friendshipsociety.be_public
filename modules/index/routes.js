var express = require('express');
var router = express.Router();

const sessionMiddleware = require('../shared/middleware/session')

/* GET home page. */
router.get('/', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('index');
});
router.get('/index', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('index');
});
router.get('/compleet', (req, res, next) => {
  res.render('compleet');
});
router.get('/detail', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('detail');
});
router.get('/faq', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('faq');
});
router.get('/instellingen', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('instellingen');
});
router.get('/invullen', (req, res, next) => {
  res.render('invullen');
});
router.get('/login', (req, res, next) => {
  res.render('login');
});
router.get('/maak-vragenlijst', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('maak-vragenlijst');
});
router.get('/profiel', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('profiel');
});
router.get('/registreer', (req, res, next) => {
  res.render('registreer');
});
router.get('/wijzig-vragenlijst', sessionMiddleware.hasSession, (req, res, next) => {
  res.render('wijzig-vragenlijst');
});
router.get('/niet-meer-vergeten-he', (req, res, next) => {
  res.render('reset-password');
});

module.exports = router;