import { Request, Response } from "express";
import createServer from "./src/app";
import authRouter from "./src/route/auth-route";
import userRouter from "./src/route/user-route";
import categoryRouter from "./src/route/category-route";
import subcategoryRouter from "./src/route/subcategory-route";
import brandRouter from "./src/route/brand-route";
import displayTagRouter from "./src/route/displayTag-route";
import orderRouter from "./src/route/order-route";
import productRouter from "./src/route/product-route";
import wishlistRouter from "./src/route/wishlist-route";
import addressRouter from "./src/route/address-route";
import hsnRouter from "./src/route/hsn-route";
import tagRouter from "./src/route/tag-route";
import featureRouter from "./src/route/feature-route";

const app = createServer();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  const response = {
    message: "Welcome to the app Created by Hardik Garg",
  };

  res.send(response);
});

app.get("/user", userRouter);
app.get("/category", categoryRouter);
app.get("/subcategory", subcategoryRouter);
app.get("/brand", brandRouter);
app.get("/displayTag", displayTagRouter);
app.get("/order", orderRouter);
app.get("/product", productRouter);
app.get("/wishlist", wishlistRouter);
app.get("/address", addressRouter);
app.get("/hsn", hsnRouter);
app.get("/auth", authRouter);
app.get("/tag", tagRouter);
app.get("/feature", featureRouter);

// default end point
app.use("*", (req, res) => {
  res.status(404).send({
    error: "AUTH404: Could not find the page requested by you",
  });
});

app.listen(port, () => {
  console.log("App listening on port", port);
});
