import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `
      <html>
        <head>
          <title>EduAyna API</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f9fafb; color: #111827; }
            h1 { color: #2563eb; margin-bottom: 0.5rem; }
            p { color: #4b5563; margin-bottom: 2rem; }
            .links { display: flex; gap: 1rem; }
            a { padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; transition: all 0.2s; }
            .primary { background-color: #2563eb; color: white; }
            .primary:hover { background-color: #1d4ed8; }
            .secondary { background-color: #e5e7eb; color: #1f2937; }
            .secondary:hover { background-color: #d1d5db; }
          </style>
        </head>
        <body>
          <h1>🚀 EduAyna Backend API</h1>
          <p>The student management system is running successfully.</p>
          <div class="links">
            <a href="/api/docs" class="primary">📚 View Swagger Documentation</a>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="secondary">🌐 Go to Frontend App</a>
          </div>
        </body>
      </html>
    `;
  }
}
