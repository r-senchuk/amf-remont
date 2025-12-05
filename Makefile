.PHONY: install dev build preview deploy serve clean

# Install dependencies
install:
	npm install

# Start Vite development server with hot reload
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build locally
preview:
	npm run preview

# Deploy to S3 (builds first, then deploys dist/)
deploy: build
	aws s3 cp dist/ s3://amfgroup.pl --recursive

# Legacy: Start simple Python server (for testing without build)
serve:
	@echo "Starting local server on http://localhost:8000"
	@echo "Note: This serves source files directly. Use 'make dev' for Vite dev server."
	@echo "Press Ctrl+C to stop"
	@cd src && python3 -m http.server 8000

# Clean build artifacts
clean:
	rm -rf dist node_modules
