.PHONY: deploy serve

# Deploy to S3
deploy: 
	aws s3 cp . s3://amfgroup.pl --exclude ".git*/*" --exclude "Makefile" --recursive

# Start local development server
serve:
	@echo "Starting local server on http://localhost:8000"
	@echo "Press Ctrl+C to stop"
	@python3 -m http.server 8000