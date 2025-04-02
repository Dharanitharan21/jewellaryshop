const path = require('path')
const productmodel = require('../Models/prodectmodel')
const multer = require('multer')
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

exports.create = (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: "Image upload failed." });
        }
        try {
            const { name, price, stock, description, category, manufacturingDate, userId } = req.body
            const image = req.file ? req.file.path : null;
            const productdoc = new productmodel({name,price,stock,description,category,manufacturingDate, image, userId})
            await productdoc.save();
            return res.status(201).json({ message: "Product created successfully", data: productdoc })
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    });
};


exports.getall = async (req, res, next) => {
    try {
        const products = await productmodel.find()
        return res.status(200).json(products);
    }
    catch (err) {
        return res.status(404).json({ error: err.message })
    }
}

exports.getbyid = async (req, res, next) => {
    try {
        const product = await productmodel.findById(req.params.id)
        if (!product) {
            return res.status(400).json({ error: "Recrd not found" })
        }
        return res.status(404).json({ data: product })
    }
    catch (err) {
        return res.status(404).json({ error: err.message })
    }
}
exports.remove = async (req, res, next) => {
    try {
        const product = await productmodel.findOneAndDelete(req.params.id)
        if (!product) {
            return res.status(400).json({ error: "Recrd not found" })
        }
        return res.status(200).json({message:"deleted suceesfully", data: product })
    }
    catch (err) {
        return res.status(404).json({ error: err.message })
    }
}
exports.update = async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Error uploading image", error: err.message });
        }
        try {
            const { name, price, stock, description, category, manufacturingDate } = req.body
            const image = req.file ? req.file.path : req.body.image;
            const product = await productmodel.findById(req.params.id);
            if (image && product) {
                const oldimagepath = path.join(__dirname, "..", product.image)
                fs.unlink(oldimagepath, (err) => {
                    if (err) {
                        console.error("Error deleting old image:", err)
                    }
                }) }
                const updatedProduct = await productmodel.findByIdAndUpdate(
                    req.params.id,{ name, price, stock, description, category, manufacturingDate ,image},{ new: true })
                    if (!updatedProduct) {
                        return res.status(404).json({ message: "Product not found" });
                      }
                
                      res.status(200).json({ message: "Product updated successfully!", data: updatedProduct })
            }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    })
}

exports.getbyuser=async(req ,res ,next)=>{
    try {
        const products = await productmodel.find({ userId: req.params.userId });
        if (!products.length) {
            return res.status(404).json({ error: "No products found for this user." });
        }
        res.status(200).json({ message: "Products retrieved successfully!", data: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
