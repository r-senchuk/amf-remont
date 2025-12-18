.PHONY: install dev build preview deploy clean help check

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RESET := \033[0m

# Help - Display available commands
help:
	@echo ""
	@echo "$(CYAN)AMF Group React Application$(RESET)"
	@echo "$(CYAN)===========================$(RESET)"
	@echo ""
	@echo "$(GREEN)Available commands:$(RESET)"
	@echo ""
	@echo "  $(YELLOW)make install$(RESET)    Install npm dependencies"
	@echo "  $(YELLOW)make dev$(RESET)        Start development server (http://localhost:3000)"
	@echo "  $(YELLOW)make build$(RESET)      Build for production"
	@echo "  $(YELLOW)make preview$(RESET)    Preview production build (http://localhost:8080)"
	@echo "  $(YELLOW)make deploy$(RESET)     Build and deploy to AWS S3"
	@echo "  $(YELLOW)make check$(RESET)      Run build to check for errors"
	@echo "  $(YELLOW)make clean$(RESET)      Remove build artifacts and node_modules"
	@echo ""

# Install dependencies
install:
	@echo "$(CYAN)Installing dependencies...$(RESET)"
	npm install
	@echo "$(GREEN)Dependencies installed successfully!$(RESET)"

# Start Vite development server with hot reload
dev:
	@echo "$(CYAN)Starting React development server...$(RESET)"
	@echo "$(GREEN)Server will be available at http://localhost:3000$(RESET)"
	npm run dev

# Build for production
build:
	@echo "$(CYAN)Building React app for production...$(RESET)"
	npm run build
	@echo "$(GREEN)Build complete! Output in dist/$(RESET)"

# Preview production build locally
preview:
	@echo "$(CYAN)Starting preview server...$(RESET)"
	@echo "$(GREEN)Preview will be available at http://localhost:8080$(RESET)"
	npm run preview

# Check build (run build without deploying)
check:
	@echo "$(CYAN)Checking build...$(RESET)"
	npm run build
	@echo "$(GREEN)Build check passed!$(RESET)"

# Deploy to S3 (builds first, then deploys dist/)
deploy: build
	@echo "$(CYAN)Deploying to AWS S3...$(RESET)"
	aws s3 sync dist/ s3://amfgroup.pl --delete
	@echo "$(GREEN)Deployment complete!$(RESET)"
	@echo ""
	@echo "$(YELLOW)Note: You may need to invalidate CloudFront cache:$(RESET)"
	@echo "  aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths '/*'"

# Deploy with CloudFront cache invalidation
deploy-invalidate: deploy
	@echo "$(CYAN)Invalidating CloudFront cache...$(RESET)"
	@if [ -n "$(CLOUDFRONT_DIST_ID)" ]; then \
		aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_DIST_ID) --paths "/*"; \
		echo "$(GREEN)Cache invalidation started!$(RESET)"; \
	else \
		echo "$(YELLOW)CLOUDFRONT_DIST_ID not set. Skipping cache invalidation.$(RESET)"; \
		echo "$(YELLOW)Set it with: make deploy-invalidate CLOUDFRONT_DIST_ID=your-id$(RESET)"; \
	fi

# Clean build artifacts
clean:
	@echo "$(CYAN)Cleaning build artifacts...$(RESET)"
	rm -rf dist
	rm -rf node_modules
	rm -rf .vite
	@echo "$(GREEN)Clean complete!$(RESET)"

# Clean only build output (keep node_modules)
clean-dist:
	@echo "$(CYAN)Cleaning dist folder...$(RESET)"
	rm -rf dist
	rm -rf .vite
	@echo "$(GREEN)Dist cleaned!$(RESET)"

# Reinstall dependencies (clean + install)
reinstall: clean install
	@echo "$(GREEN)Reinstall complete!$(RESET)"
