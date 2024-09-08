const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
    const { user } = req.params;
    try {
      const orders = await Order.find({ user: user });

      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
      const doc = await order.save();
      res.status(201).json(doc);
    } catch (err) {
        console.log(err)
      res.status(400).json(err);
    }
  };

  exports.deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };




  exports.fetchAllOrders = async (req, res)=>{
  //  sort = { _sort: option.sort };
  // pagination = {_page : 1, _per_page : 12}
    let query = Order.find({})
    let totalProductsQuery = Order.find({});
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