# [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)
> 練習看懂一個小專案

### package.json

看他用了哪些套件

```js
  "dependencies": {
    // Promise based HTTP client for the browser and node.js
    "axios": "^0.17.1",
    // Terminal string styling done right
    "chalk": "^2.3.0",
    // Simple config handling for your app or module
    "conf": "^1.3.1",
    // A better `child_process'
    "execa": "^0.8.0",
    // Autocomplete prompt for inquirer
    "inquirer": "^4.0.0",
    // Autocomplete prompt for inquirer
    "inquirer-autocomplete-prompt": "^0.12.0",
    // CLI app helper
    "meow": "^4.0.0",
    // Get an array of parent directories including itself
    "parent-dirs": "^1.0.0",
    // Check if a path exists
    "path-exists": "^3.0.0",
    // Update notifications for your CLI app
    "update-notifier": "^2.3.0"
  },
  "devDependencies": {
    // Uploading report to Codecov: https://codecov.io
    "codecov": "^3.0.0",
    // Delightful JavaScript Testing.
    "jest": "^21.2.1",
    // JavaScript Standard Style
    "standard": "^10.0.3"
  },
```

### 程式架構

1. 利用``meow``先創建一個``cli``的``object``, ``axios``去創建一個``apiClient``
2. 把``apiClient``丟到``GitmojiCli``去初始化, 以利fetch資料時使用
3. 利用``utils``去``parse``指令, 然後call``GitmojiCli``的``function``

所以重點是``GitmojiCli``裡面的``function``

### gitmoji.js

```
    --commit, -c    Interactively commit using the prompts
    --config, -g    Setup gitmoji-cli preferences.
    --init, -i      Initialize gitmoji as a commit hook
    --list, -l      List all the available gitmojis
    --remove, -r    Remove a previously initialized commit hook
    --search, -s    Search gitmojis
    --update, -u    Sync emoji list with the repo
    --version, -v   Print gitmoji-cli installed version
```

從最簡單的開始

1. ``--list``

	1. 先call``_fetchEmojis``去``fetch``所有的emoji
	2. 怎麼``fetch``? 如果在``cache``(HOME)中已經有了, 就直接用``cache``的, 如果沒有, 那就透過``axios``去``fetch``過來放到``cache``中
	3. ``fetch``到的資料會是``json``檔, 所以要經過parser去parse他, 因此call``_parseGitmojis``
	
	```js
	  list () {
	    return this._fetchEmojis()
	      .then(gitmojis => this._parseGitmojis(gitmojis))
	      .catch(err => this._errorMessage(`gitmoji list not found - ${err.code}`))
	  }
	```


2. ``--search``
	非常簡單, 就是去``fetch``看看有沒有而已

3.	``--init``, ``--remove``
	利用``fs``將使令灌入``prepare-commit-msg``, 會形成一個``hook``, 只要使用者輸入了``git commit``就會自動跳出``interactive``介面去選擇gitmoji
 
4. ``--commit``
	1. 啟用``inquire``去跟使用者互動, 會獲得一個``answer``的``array``
	2. 如果現在有``hook``那就直接把``commit``內容寫到``.git/COMMIT_EDITMSG``中, 如果沒有``hook``那就用``shell``指令輸入``git commit -m....``

### How to test?
### How to convert to npm package?

```sh
npm publish
```

### Issue
1. 當hook建立完成後再使用``gitmoji -c``會有問題
	- 原因: 建立hook後只要打``git commit ...``就會進入那個interactive頁面. 如果在建立hook後呼叫``gitmoji -c``他會先進入interactive介面讓使用者選好answer, 然後執行``git commit -m 'blablabla'``, 但執行時又會call``bin/gitmoji``去執行``gitmoji --hook ...``, 所以等於是在執行一``bin/gitmoji``中又執行了``bin/gitmoji``, 會導致程式當掉
	- 解決: 比較好的方法是讓他在執行``git commit -m 'blablabla'``時, 可以暫時忽略掉hook
2. 當hook建立完後, 有時候``.git/COMMIT_EDITMSG``會是空的
	- 原因: **可能**是因為``writeFile``強制覆寫了``.git/COMMIT_EDITMSG``中的內容(但其實default也都是comment message, 所以覆寫應該沒差), 會導致有時候在輸入完``git commit``後, 裡面卻是空的, 保險的做法是使用``appendFile``直接接下``.git/COMMIT_EDITMSG``, 本端測試完後暫時沒有問題
	- 問作者: 為什麼hook裡面沒有git add . gitmoji -c 卻有

### Q&A
What does ``#!/usr/bin/env node`` means?

> It's called a shebang, and tells the parent shell which interpreter should be used to execute the script.

> It's implemented as a comment so that anything coming in that line will not "relevant" to the interpreter specified. e.g. all scripting languages tend to understand that a line starting with # is a comment, and will ignore the !/usr/bin/whatever portion, which might otherwise be a syntax error in that particular language.

What does ``exec...`` means?

```sh
#!bin/sh
exec < /dev/tty
gitmoji --hook $1
```

npm gloabl

```sh
 /usr/local/lib/node_modules
```