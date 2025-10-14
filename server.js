import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// 📚 Cấu hình Swagger
// ========================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Backend API Docs",
      version: "1.0.0",
      description: "API mô phỏng hệ thống quản lý sách (demo CI/CD với Jenkins + Docker)",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./server.js"], // chỉ định file chứa comment mô tả API
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========================
// 🚀 Các API
// ========================

/**
 * @swagger
 * /:
 *   get:
 *     summary: Kiểm tra server đang hoạt động
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get("/", (req, res) => {
  res.send("🎉 Simple Backend API is running!");
});

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Lấy danh sách sách
 *     responses:
 *       200:
 *         description: Trả về danh sách sách
 */
const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
  { id: 3, title: "You Don’t Know JS", author: "Kyle Simpson" },
];
app.get("/api/books", (req, res) => res.json(books));

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Thêm sách mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo sách mới thành công
 */
app.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Lấy thông tin sách theo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về thông tin sách
 *       404:
 *         description: Không tìm thấy sách
 */
app.get("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Xóa sách theo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy sách
 */
app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  const removed = books.splice(index, 1);
  res.json(removed[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
