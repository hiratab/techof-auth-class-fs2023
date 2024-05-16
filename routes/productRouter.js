const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const {
  getProducts,
  createProduct,
} = require('../services/productService');

const productRouter = express.Router();

productRouter.get('', async (req, res) => {
  try {
    const product = await getProducts();

    res.send({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'failure',
      data: error
    });
  }
});

productRouter.post('',
  (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({
        status: 'failure',
        data: 'Missing auth token'
      });
    }

    next();
  },
  async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      const [tokenType, token] = authorization.split(' ');
      const result = jsonwebtoken.verify(
        token,
        'MY_SUPER_STRONG_PASSWORD'
      );

      if (!result) {
        return res.status(401).send({
          status: 'failure',
          data: 'Invalid auth token'
        });
      }
      req.userId = result.userId;
      req.email = result.email;
      req.permissions = result.permissions;

      next();
    } catch (error) {
      return res.status(401).send({
        status: 'failure',
        data: error
      });
    }
  },
  async (req, res, next) => {
    try {
      const { permissions } = req;
      const PERMISSION_CREATE_PRODUCT = 'CREATE_PRODUCT';

      if (!permissions.includes(PERMISSION_CREATE_PRODUCT)) {
        return res.status(403).send({
          status: 'failure',
          data: 'No permission to create product'
        });
      }

      return next();
    } catch (error) {
      return res.status(401).send({
        status: 'failure',
        data: error
      });
    }
  },
  async (req, res) => {
    try {
      const {
        title,
        description,
        price
      } = req.body;

      const newProduct = await createProduct({
        title,
        description,
        price
      });

      res.send({
        status: 'success',
        data: newProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: 'failure',
        data: error
      });
    }
  }
);

module.exports = productRouter;
