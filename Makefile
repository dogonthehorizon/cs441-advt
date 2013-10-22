# Filename: Makefile
# Author: Fernando Freire
# Date created: 21 Oct, 2013

CSS-COMPILER=compass
PYTHON=`which python`

init: css-compile

# TODO session: this should start a tmux session

# If you run into issues with this command it is probably because
# you are using Python 3.x, in which case the proper command would
# be: `python -mhttp.server 8080`
server:
	$(PYTHON) -mSimpleHTTPServer 8080

css-watch:
	$(CSS-COMPILER) watch

css-compile:
	$(CSS-COMPILER) compile