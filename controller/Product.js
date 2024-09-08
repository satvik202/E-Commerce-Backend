const {Product} = require('../model/Product.js')

exports.createProduct = async (req, res)=>{
    const product = new Product(req.body)
    try{
        const doc = await product.save()
        res.status(201).json(doc)
    }catch(err){
        res.status(400).json(err);
    }
}
exports.fetchAllProducts = async (req, res)=>{
    // filter = {"category":["smartphone","laptops"]}
  //  sort = { _sort: option.sort };
  // pagination = {_page : 1, _per_page : 12}
    let query = Product.find({deleted : {$ne : true}})
    let totalProductsQuery = Product.find({deleted : {$ne : true}});
    if(req.query.category){
        query = query.find({"category" : req.query.category})
        totalProductsQuery = totalProductsQuery.find({"category" : req.query.category})
    }
    if(req.query.brand){
        query = query.find({"brand" : req.query.brand})
        totalProductsQuery = totalProductsQuery.find({"brand" : req.query.brand})
    }
    const items = await totalProductsQuery.countDocuments().exec();
    // console.log({items});
    if(req.query._sort){
        const order = req.query._sort[0]==='-' ? -1 : 1;
        const field = order === -1 ? req.query._sort.slice(1) : req.query._sort;
        query = query.sort({ [field]: order });
    }

    if(req.query._page && req.query._per_page){
        const pageSize = req.query._per_page
        const page = req.query._page
        query = query.skip(pageSize*(page-1)).limit(pageSize)
    }
    try{
        const doc = await query.exec()
        res.status(200).json({data : doc, items : items})
    }catch(err){
        res.status(400).json(err);
    }
}



exports.fetchProductById = async (req, res)=>{
    const {id} = req.params
    try{
        const product = await Product.findById(id)
        res.status(201).json(product)
    }catch(err){
        res.status(400).json(err);
    }
}
exports.updateProduct = async (req, res)=>{
    const {id} = req.params
    try{
        const product = await Product.findByIdAndUpdate(id, req.body, {new : true})
        res.status(201).json(product)
    }catch(err){
        res.status(400).json(err);
    }
}
