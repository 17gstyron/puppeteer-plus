# puppeteer-plus
Puppeteer addon for web scraping

This is intended to be installed alonside Puppeteer to add some useful tools to the default Puppeteer prototypes useful for web scraping.

# How to

First, install Puppeteer and Puppeteer-Plus

`npm i puppeteer`

`npm i puppeteer-plus`

Puppeteer-Plus is designed to be used as a drop-in replacement for Puppeteer. As such, at the top of your code, just use

`const puppeteer = require('puppeteer-plus')`