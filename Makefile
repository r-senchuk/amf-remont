.PHONY: deploy

deploy: 
	aws s3 cp . s3://amfgroup.pl --exclude ".git*/*" --exclude "Makefile" --recursive