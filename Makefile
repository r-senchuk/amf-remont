.PHONY: install dev build preview check clean clean-dist reinstall help

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
	@echo "  $(YELLOW)make check$(RESET)      Run build to check for errors"
	@echo "  $(YELLOW)make clean$(RESET)      Remove build artifacts and node_modules"
	@echo "  $(YELLOW)make clean-dist$(RESET) Remove build artifacts (keep node_modules)"
	@echo "  $(YELLOW)make reinstall$(RESET)  Clean and reinstall dependencies"
	@echo ""

# Install dependencies
install:
	@echo "$(CYAN)Installing dependencies...$(RESET)"
	npm ci
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
