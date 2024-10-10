import Product from "../models/product-model.js";

//@desc Get All Products
//@route GET /api/products/
//@access public
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).send({
    count: products.length,
    data: products,
  });
};

//@desc Get Product by Id
//@route GET /api/products/:id
//@access public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).send(product[0]);
};

//@desc Create A Product
//@route POST /api/products/
//@access public
const createProduct = async (req, res) => {
  const { productName, productPrice, productCategory } = req.body;

  if (!productName || !productPrice || !productCategory) {
    res.status(400);
    throw new Error("All Fields are mandatory.");
  }

  const createdProduct = await Product.create({
    productName: productName,
    productPrice,
    productCategory,
  });

  res.status(201).send({
    message: "Product created successfully",
    _id: createdProduct._id,
  });
};

//@desc Update A Product by Id
//@route PUT /api/products/:id
//@access public
const updateProductById = async (req, res) => {
  const productToBeDeleted = Product.find({ _id: req.params.id });

  if (!productToBeDeleted) {
    res.status(404);
    throw new Error("Product not found");
  }
  const { productName, productPrice, productCategory } = req.body;

  if (!productName || !productPrice || !productCategory) {
    res.status(400);
    throw new Error("All Fields are mandatory.");
  }

  let product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send(product);
};

//@desc Delete A Product by Id
//@route DELETE /api/products/:id
//@access public
const deleteProductById = async (req, res) => {
  const productToBeDeleted = Product.find({ _id: req.params.id });

  if (!productToBeDeleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(req.params.id);
  res.status(200);
  res.send({ message: "Product deleted successfully" });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
};
