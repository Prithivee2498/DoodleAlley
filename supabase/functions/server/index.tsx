import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0dc0a659/health", (c) => {
  return c.json({ status: "ok" });
});

// Admin login endpoint
app.post("/make-server-0dc0a659/admin/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    // Check admin credentials from KV store
    const adminCreds = await kv.get("admin:credentials");
    
    // If no admin exists, create default admin (admin/admin123)
    if (!adminCreds) {
      await kv.set("admin:credentials", { username: "admin", password: "Honey@2908" });
      if (username === "admin" && password === "Honey@2908") {
        return c.json({ success: true, message: "Login successful" });
      }
    } else {
      if (adminCreds.username === username && adminCreds.password === password) {
        return c.json({ success: true, message: "Login successful" });
      }
    }
    
    return c.json({ success: false, message: "Invalid credentials" }, 401);
  } catch (error) {
    console.log("Admin login error:", error);
    return c.json({ success: false, message: "Login error" }, 500);
  }
});

// Get all products
app.get("/make-server-0dc0a659/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ products: products || [] });
  } catch (error) {
    console.log("Error fetching products:", error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// Get single product
app.get("/make-server-0dc0a659/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const product = await kv.get(`product:${id}`);
    
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    return c.json({ product });
  } catch (error) {
    console.log("Error fetching product:", error);
    return c.json({ error: "Failed to fetch product" }, 500);
  }
});

// Create product (admin only)
app.post("/make-server-0dc0a659/products", async (c) => {
  try {
    const product = await c.req.json();
    const id = Date.now().toString();
    const timestamp = new Date().toISOString();
    
    const newProduct = {
      id,
      ...product,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    await kv.set(`product:${id}`, newProduct);
    return c.json({ product: newProduct }, 201);
  } catch (error) {
    console.log("Error creating product:", error);
    return c.json({ error: "Failed to create product" }, 500);
  }
});

// Update product (admin only)
app.put("/make-server-0dc0a659/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const updates = await c.req.json();
    
    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: "Product not found" }, 404);
    }
    
    const updatedProduct = {
      ...existingProduct,
      ...updates,
      id, // preserve original id
      createdAt: existingProduct.createdAt, // preserve creation date
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`product:${id}`, updatedProduct);
    return c.json({ product: updatedProduct });
  } catch (error) {
    console.log("Error updating product:", error);
    return c.json({ error: "Failed to update product" }, 500);
  }
});

// Delete product (admin only)
app.delete("/make-server-0dc0a659/products/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // Step 1: Load product from KV
    const product = await kv.get(`product:${id}`);
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }

    // Step 2: Delete images from Supabase Storage
    if (Array.isArray(product.images)) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // required to delete images
      );

      const imagePaths = product.images
        .map((url: string) => url.split("/product-images/")[1])
        .filter(Boolean); // remove undefined/null

      if (imagePaths.length > 0) {
        const { error: storageError } = await supabase
          .storage
          .from("product-images")
          .remove(imagePaths);

        if (storageError) {
          console.error("Failed to delete images:", storageError);
          return c.json({ error: "Failed to delete images" }, 500);
        }
      }
    }

    // Step 3: Delete product from KV
    await kv.del(`product:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

// Create order
app.post("/make-server-0dc0a659/orders", async (c) => {
  try {
    const order = await c.req.json();
    const id = Date.now().toString();
    
    const newOrder = {
      id,
      ...order,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${id}`, newOrder);
    return c.json({ order: newOrder }, 201);
  } catch (error) {
    console.log("Error creating order:", error);
    return c.json({ error: "Failed to create order" }, 500);
  }
});

// Get all orders (admin only)
app.get("/make-server-0dc0a659/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix("order:");
    return c.json({ orders: orders || [] });
  } catch (error) {
    console.log("Error fetching orders:", error);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
});

Deno.serve(app.fetch);