# Stack-cli

### package.json

```js
{
  "dependencies": {
    // babel selfContained runtime
    "babel-runtime": "^6.26.0",
    // babel selfContained runtime
    "cfonts": "^1.1.3",
    "chalk": "^2.3.0",
    "cli-table2": "^0.2.0",
    "inquirer": "^4.0.0",
    "meow": "^3.7.0",
    // A better node-open. Opens stuff like websites, files, executables. Cross-platform.
    "opn": "^5.1.0",
    // Elegant terminal spinner
    "ora": "^1.3.0",
    "wappalyzer": "5.1.6"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "mocha": "^4.0.1",
    "should": "^13.1.3"
  }
}

```

### How it works?

core為``search``這個function, 但其實也非常單純, 就是利用``wappalyzer``去爬資料下來, 然後把它美化成表格
### What is travis?
### What is docker?

### Q&A

- Why babel?