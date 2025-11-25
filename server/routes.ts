import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from client/public directory
  const publicPath = path.join(import.meta.dirname, '..', 'client', 'public');
  app.use(express.static(publicPath));
  
  // Serve attached assets
  const assetsPath = path.join(import.meta.dirname, '..', 'attached_assets');
  app.use('/attached_assets', express.static(assetsPath));
  
  // API route to get PayPal client ID
  app.get('/api/paypal/client-id', (req, res) => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    
    if (!clientId) {
      return res.status(503).json({ 
        error: 'PayPal not configured',
        message: 'PayPal credentials are not set up. Please configure PAYPAL_CLIENT_ID in environment variables.'
      });
    }
    
    res.json({ clientId });
  });

  const httpServer = createServer(app);

  return httpServer;
}
