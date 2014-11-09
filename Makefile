include node_modules/make-better/core.inc
include node_modules/make-better/frontend.inc

STYLUS_DIR := ./css


# General targets
build: html css
html: index.html
css: css/style.css

# Specific targets
index.html: index.jade
	jade -P index.jade

css/style.css: $(STYLUS_FILES)
	stylus css/style.styl
