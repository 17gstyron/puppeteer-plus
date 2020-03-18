# puppeteer-plus

Puppeteer addon for web scraping

This is intended to be installed alonside Puppeteer to add some useful tools to the default Puppeteer prototypes useful for web scraping.

# How to

First, install Puppeteer-Extra, Puppeteer-Extra-Plugin-Stealth and Puppeteer-Plus

`npm i puppeteer-extra`

`npm i puppeteer-extra-plugin-stealth`

`npm i puppeteer-plus`

Puppeteer-Plus is designed to be used as a drop-in replacement for Puppeteer. As such, at the top of your code, just use

`const puppeteer = require('puppeteer-plus')`
