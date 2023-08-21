const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");
// Set default middlewares (logger, static, cors and no-cache)

server.use(cors());
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === "PATCH" || req.method === "PUT") {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});
// Use default router
// Get: /api/your_cart
// Post: /api/your_cart/add
// Put: /api/your_cart/update/:id
// Delete: /api/your_cart/remove/:id
server.post("/api/your_cart/add", (req, res, next) => {
  const { id } = req.body;
  const item = router.db.get("your_cart").find({ id: id }).value();

    if (item) {
      const newItem = router.db
        .get("your_cart")
        .find({ id: id })
        .assign({ quantity: item.quantity + 1, ...req.body })
        .write();

      res.status(201).json({ success: true, message: "Success", newItem }); // Trả về phản hồi JSON
    } else {
      const newItem = router.db
        .get("your_cart")
        .push({
          id: id,
          quantity: 1,
          ...req.body,
        })
        .write();

      res.status(201).json({ success: true, message: "Success", newItem }); // Trả về phản hồi JSON
    }
});

server.put("/api/your_cart/update/:id", (req, res) => {
  const cartItemId = req.params.id;
  const { quantity } = req.body;
  router.db
    .get("your_cart")
    .find({ id: cartItemId })
    .assign({ quantity: parseInt(quantity) })
    .write();
  res.status(200).json({ success: true, message: "Updated successfully" });
});

server.delete("/api/your_cart/remove/:id", (req, res) => {
  const cartItemId = req.params.id;
  router.db.get("your_cart").remove({ id: cartItemId }).write();
  res.status(200).json({ success: true, message: "Deleted successfully" });
});

server.use("/api", router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
