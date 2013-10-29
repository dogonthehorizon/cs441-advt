# Filename: Makefile
# Author: Fernando Freire
# Date created: 21 Oct, 2013

# For a description of why this is useful:
# http://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
.PHONY: _pwd-prompt decrypt-conf encrypt-conf

CSS-COMPILER=compass
PYTHON=`which python`

CONF_FILE=conf/settings.txt

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


# API Key Management
# http://ejohn.org/blog/keeping-passwords-in-source-control

_pwd-prompt:
	@echo "Contact ffreire.fernando@gmail.com for the password."

decrypt-conf: _pwd-prompt
	openssl cast5-cbc -d -in $(CONF_FILE).cast5 -out $(CONF_FILE)
	chmod 600 $(CONF_FILE)

encrypt-conf: _pwd-prompt
	openssl cast5-cbc -e -in $(CONF_FILE) -out $(CONF_FILE).cast5

