import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import { type Express } from "express";

import runApp from "./app";

export async function setupStaticServer(app: Express, server: Server) {
  // Serve the vanilla HTML/CSS/JS website
  // All static files are already configured in routes.ts
  
  // Catch-all route to serve index.html for any non-API routes
  app.use("*", async (req, res, next) => {
    // Skip API routes
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    
    try {
      const indexPath = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "public",
        "index.html",
      );
      
      const html = await fs.promises.readFile(indexPath, "utf-8");
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      next(e);
    }
  });
}

(async () => {
  await runApp(setupStaticServer);
})();
