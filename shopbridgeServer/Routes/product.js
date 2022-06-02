const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

//Product schema import
const Product = require('../Models/product');
//Packages
var multer  = require('multer'); // Package to upload image

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});

//get Post list
router.get("/list", async (req, res) => {
  try {
	const product = await Product.find({});
    res.status(200).json({
      code: 200,
      message: "Product list fetched successfully",
      data: product,
      status: true
    });
  } catch (error) {
    res.status(500).json({ 
      code: 500,
      message: error,
      data: null,
      status: false 
    });
  }
});

//Add Product
router.post("/", upload.any("image"), async (req, res) => {
	console.log(req.files);

	const prodcut = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		image: req?.files[0]?.path
	});

	try {
		var response = await prodcut.save();
		res.status(200).json({
			code: 200,
			message: "Product added successfully..!",
			data: response,
			status: true,
		});
	} catch (err) {
		res.status(500).json({
			code: 500,
			message: err,
			data: null,
			status: false,
		});
	}
});

//update forum info
router.patch("/:productId", upload.any(), async (req, res) => {
	try {

		let imageLink = null;
		if(req.files) {
			req.files.forEach(element => {
				if(element.fieldname == 'image')
				  imageLink = element.path;
			  });
		}
		

		const product = await Product.updateOne(
			{ _id: req.params.productId },
			{
				$set: {
					name: req.body.name,
					description: req.body.description,
					price: req.body.price,
					image: (imageLink !== null) ? imageLink : req.body.image,
				},
			}
		);

		res.status(200).json({
			code: 200,
			message: "Product updated successfully",
			data: product,
			status: true,
		});
	} catch (error) {
		res.status(500).json({
			code: 500,
			message: error,
			data: null,
			status: false,
		});
	}
});

//Delete product
router.delete("/:productId", async (req, res) => {
	try {
		const product = await Product.deleteOne({ _id: req.params.productId });
		res.status(200).json({
			code: 200,
			message: "Product deleted successfully",
			data: product,
			status: true,
		});
	} catch (error) {
		res.status(500).json({
			code: 500,
			message: error,
			data: null,
			status: false,
		});
	}
});

//update product status
router.patch("/update-status/:productId", upload.any(), async (req, res) => {
	try {
		const product = await Product.updateOne(
			{ _id: req.params.productId },
			{
				$set: {
					inStock: req.body.status,
				},
			}
		);

		res.status(200).json({
			code: 200,
			message: "Product stock status changed successfully",
			data: product,
			status: true,
		});
	} catch (error) {
		res.status(500).json({
			code: 500,
			message: error,
			data: null,
			status: false,
		});
	}
});

//Get product by id
router.get("/details/:productId", async (req, res) => {
	try {
		const product = await Product.find({ _id: req.params.productId });
		res.status(200).json({
			code: 200,
			message: "Product fetched successfully",
			data: product,
			status: true,
		});
	} catch (error) {
		res.status(500).json({
			code: 500,
			message: error,
			data: null,
			status: false,
		});
	}
});
module.exports = router