.PHONY: serve clean

serve:
	python3 -m http.server 8000

clean:
	find . -name '.DS_Store' -delete
