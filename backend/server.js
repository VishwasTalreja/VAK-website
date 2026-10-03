const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("./models/Admin");
const Inquiry = require("./models/Inquiry");
const Article = require("./models/Article");
const protectAdmin = require("./middleware/authMiddleware");
const Testimonial = require("./models/Testimonial");
const app = express();


// ========================================
// DATABASE CONNECTION
// ========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// ADMIN LOGIN
// ========================================

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ========================================
// PUBLIC INQUIRY ROUTE
// ========================================

// CREATE INQUIRY
app.post("/api/inquiries", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit inquiry",
      error: error.message,
    });
  }
});


// ========================================
// ADMIN INQUIRY ROUTES
// ========================================

// GET ALL INQUIRIES - ADMIN ONLY
app.get(
  "/api/admin/inquiries",
  protectAdmin,
  async (req, res) => {
    try {
      const inquiries = await Inquiry.find().sort({
        createdAt: -1,
      });

      res.status(200).json(inquiries);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch inquiries",
      });
    }
  }
);


// DELETE INQUIRY - ADMIN ONLY
app.delete(
  "/api/admin/inquiries/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const inquiry = await Inquiry.findByIdAndDelete(
        req.params.id
      );

      if (!inquiry) {
        return res.status(404).json({
          message: "Inquiry not found",
        });
      }

      res.status(200).json({
        message: "Inquiry deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete inquiry",
        error: error.message,
      });
    }
  }
);


// ========================================
// PUBLIC ARTICLE ROUTES
// ========================================

// GET ALL PUBLISHED ARTICLES
app.get("/api/articles", async (req, res) => {
  try {
    const articles = await Article.find({
      published: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch articles",
      error: error.message,
    });
  }
});


// GET ONE PUBLISHED ARTICLE
app.get("/api/articles/:id", async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      published: true,
    });

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch article",
      error: error.message,
    });
  }
});


// ========================================
// ADMIN ARTICLE ROUTES
// ========================================

// CREATE ARTICLE - ADMIN ONLY
app.post(
  "/api/admin/articles",
  protectAdmin,
  async (req, res) => {
    try {
      const {
        title,
        category,
        summary,
        content,
        published,
      } = req.body;

      const article = await Article.create({
        title,
        category,
        summary,
        content,
        published,
      });

      res.status(201).json({
        message: "Article created successfully",
        article,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create article",
        error: error.message,
      });
    }
  }
);


// GET ALL ARTICLES - ADMIN ONLY
app.get(
  "/api/admin/articles",
  protectAdmin,
  async (req, res) => {
    try {
      const articles = await Article.find().sort({
        createdAt: -1,
      });

      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch articles",
        error: error.message,
      });
    }
  }
);


// UPDATE ARTICLE - ADMIN ONLY
app.put(
  "/api/admin/articles/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const {
        title,
        category,
        summary,
        content,
        published,
      } = req.body;

      const article = await Article.findByIdAndUpdate(
        req.params.id,
        {
          title,
          category,
          summary,
          content,
          published,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!article) {
        return res.status(404).json({
          message: "Article not found",
        });
      }

      res.status(200).json({
        message: "Article updated successfully",
        article,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update article",
        error: error.message,
      });
    }
  }
);


// DELETE ARTICLE - ADMIN ONLY
app.delete(
  "/api/admin/articles/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(
        req.params.id
      );

      if (!article) {
        return res.status(404).json({
          message: "Article not found",
        });
      }

      res.status(200).json({
        message: "Article deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete article",
        error: error.message,
      });
    }
  }
);

// ========================================
// GET PUBLISHED TESTIMONIALS - PUBLIC
// ========================================

app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      published: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(testimonials);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
});
// ========================================
// GET ALL TESTIMONIALS - ADMIN
// ========================================

app.get(
  "/api/admin/testimonials",
  protectAdmin,
  async (req, res) => {
    try {
      const testimonials = await Testimonial.find()
        .sort({ createdAt: -1 });

      res.status(200).json(testimonials);

    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch testimonials",
        error: error.message,
      });
    }
  }
);
// ========================================
// CREATE TESTIMONIAL - ADMIN
// ========================================

app.post(
  "/api/admin/testimonials",
  protectAdmin,
  async (req, res) => {
    try {
      const {
        name,
        role,
        text,
        published,
      } = req.body;

      const testimonial = await Testimonial.create({
        name,
        role,
        text,
        published,
      });

      res.status(201).json({
        message: "Testimonial created successfully",
        testimonial,
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to create testimonial",
        error: error.message,
      });
    }
  }
);
// ========================================
// UPDATE TESTIMONIAL - ADMIN
// ========================================

app.put(
  "/api/admin/testimonials/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const testimonial =
        await Testimonial.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!testimonial) {
        return res.status(404).json({
          message: "Testimonial not found",
        });
      }

      res.status(200).json({
        message: "Testimonial updated successfully",
        testimonial,
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to update testimonial",
        error: error.message,
      });
    }
  }
);
// ========================================
// DELETE TESTIMONIAL - ADMIN
// ========================================

app.delete(
  "/api/admin/testimonials/:id",
  protectAdmin,
  async (req, res) => {
    try {
      const testimonial =
        await Testimonial.findByIdAndDelete(
          req.params.id
        );

      if (!testimonial) {
        return res.status(404).json({
          message: "Testimonial not found",
        });
      }

      res.status(200).json({
        message: "Testimonial deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to delete testimonial",
        error: error.message,
      });
    }
  }
);
// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `VAK server running on http://localhost:${PORT}`
  );
});