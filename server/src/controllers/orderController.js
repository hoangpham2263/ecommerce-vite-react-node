import db from "../models/index";
const { Op } = require('sequelize');

const order_attributes = ["id", "user_id", "cart_ids", "order_status", "total", "note", "updatedAt", "createdAt"]

const prod_attributes = ["id", "title", "desc", "slug", "capacity_id", "ram_id", "category_id", "brand_id", "version_id", "is_active", "updatedAt", "createdAt"]
const prod_includes = [
  { model: db.Capacity, attributes: ["id", "name"] },
  { model: db.Ram, attributes: ["id", "name"] },
  { model: db.Category, attributes: ["id", "name"] },
  { model: db.Brand, attributes: ["id", "name"] },
  { model: db.Version, attributes: ["id", "name"] },
]
const conf_attributes = ["id", "price", "stock", "discount", "color_id", "product_id", "is_active", "updatedAt", "createdAt"]
const conf_includes = [
  { model: db.Color, attributes: ["id", "name", 'color_code'] },
  { model: db.Product, attributes: ["id", "title", "desc", "slug", "capacity_id", "ram_id", "category_id", "brand_id", "version_id", "is_active", "updatedAt", "createdAt"] },
]

const cart_attributes = ["id", "UserId", "ProductId", "quantity", "config_id", "updatedAt", "createdAt"]
const cart_includes = [
  { model: db.Product, attributes: prod_attributes, include: prod_includes },
  { model: db.Config, attributes: conf_attributes, include: conf_includes }
]

const readFunc = async (req, res) => {
  try {
    let data;
    let orderData;
    const { order_status } = req.query;
    const where = { user_id: req?.account?.user?.id };
    if (order_status) where.order_status = order_status;

    if (req.query.page && req.query.limit) {
      let { page, limit } = req.query;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      let offset = (page - 1) * limit;

      // Lấy dữ liệu order và số lượng trang
      let { count, rows } = await db.Order.findAndCountAll({
        offset: offset,
        limit: limit,
        where: where,
        attributes: order_attributes,
        order: [["user_id", "ASC"]],
      });

      const totalPages = Math.ceil(count / limit);
      orderData = { totalRows: count, totalPages: totalPages, orders: rows };
    } else {
      const orders = await db.Order.findAll({
        attributes: order_attributes,
        where: where,
        order: [["user_id", "ASC"]],
      });
      orderData = { orders: orders };
    }

    // Lấy tất cả các cart_ids từ danh sách orders và loại bỏ trùng lặp
    const cartIds = [...new Set(orderData.orders.flatMap(order => order.cart_ids || []))];

    // Nếu có cart_ids, lấy chi tiết giỏ hàng từ cơ sở dữ liệu
    let cartDetails = [];
    if (cartIds.length > 0) {
      const cartData = await db.Cart.findAll({
        where: { id: { [Op.in]: cartIds } },
        attributes: cart_attributes,
        order: [["UserId", "ASC"]],
        include: cart_includes,
      });

      // Lấy thông tin hình ảnh của từng cart
      cartDetails = await Promise.all(cartData.map(async (cart) => {
        const cartDataValues = cart.dataValues;

        const images = await db.Image.findAll({
          where: { config_id: cartDataValues.config_id },
          attributes: ["id", "url", "file_name"],
        });

        return {
          ...cartDataValues,
          images: images.map(image => ({
            id: image.id,
            url: image.url,
            file_name: image.file_name,
          }))
        };
      }));
    }

    // Tạo object cartMap để map cart_id với chi tiết giỏ hàng
    const cartMap = cartDetails.reduce((map, cart) => {
      map[cart.id] = cart;
      return map;
    }, {});

    // Gắn thông tin cart vào từng order
    const enrichedOrders = orderData.orders.map(order => {
      const cartDetailsForOrder = (order.cart_ids || []).map(cartId => cartMap[cartId] || null).filter(cart => cart !== null);
      return {
        ...order,
        carts: cartDetailsForOrder
      };
    });

    // Kết hợp thông tin order và thông tin chi tiết giỏ hàng
    data = {
      totalRows: orderData.totalRows || enrichedOrders.length,
      totalPages: orderData.totalPages || 1,
      orders: enrichedOrders
    };

    return res.status(200).json({ message: "get order success", data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server" });
  }
};


const createFunc = async (req, res) => {
  try {
    const { user_id, cart_ids, order_status, total, note } = req.body.data;
    if (!user_id || !cart_ids || !order_status || !total || !note) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Order.create({ user_id: user_id, cart_ids: cart_ids, order_status: order_status, total: total, note: note });
    return res.status(200).json({ message: "a order is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let order = await db.Order.findOne({ where: { id: data?.id, }, });
    if (order) {
      await order.update({ order_status: data.order_status });
      return res.status(200).json({ message: data.order_status });
    } else {
      return res.status(200).json({ message: "order not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server" });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let order = await db.Order.findOne({ where: { id: id, }, });
    if (order) {
      await order.destroy();
      return res.status(200).json({ message: "delete order success" });
    } else {
      return res.status(200).json({ message: "order not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server" });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
