# VueCli3.0, node, mongoDB建立後台管理系統


# 安裝套件

### $ npm i nodemon
動態監測後端程式變動，不用一直npm run server

### $ npm i mongoose
js用來連接mongoDB的套件

### $ npm i body-parser
將http中request中的body進行解析

### $ npm i bcrypt
用來將密碼加密

### $ npm i gravatar
用來產生avatar圖像

### $ npm i bcrypt
處理密碼加密及對照

### $ npm i jsonwebtoken passport passport-jwt
jsonwebtoken產生jwt，passport、passport-jwt解析並驗證jwt

### $ npm i vue@3.0.0

### sudo npm install -g @vue/cli@3.0.0 
全域安裝vue/cli 3.0.0版本，就不用再個別專案安裝cli

### $ npm i concurrently

要讓前端client和後端server用一台終端機同時去開啟

在client資料夾中改變scripts的配置：
"start": "npm run serve"

在專案中的package.json改變scripts的配置：
"client-install": "npm install --prefix client",
"client": "npm start --prefix client"
"dev": "concurrently \"npm run server\" \"npm run client\" "


簡單來說，能把 Passport 想成是一個「處理驗證的 middleware」，因此能很容易的整合到 Express 當中 。

passport-jwt使用jwt驗證端點，被用來安全化RESTful端點，而不需用到sessions

# 開發流程

## 1.建立後台server.js

## 2.連接mongoDB資料庫

## 3.建立User model

## 4.建立users router

建立users api，銜接register, login, current

## 5.進行token驗證
passport, passport-jwt

### 流程
1.在server.js主頁，將passport進行初始化`passport.initialize()`，再來進行導入自定義模組passport.js，帶入passportConfig(passport)進行配置。

2.進入到passport.js模組，`passport.use()`內帶入opts建構JwtStrategy新物件，此opts的屬性會萃取extract bearer token。
然後，透過password-jwt進行解析，之後會呼叫帶有jwt-payload訊息的函式。

3.然後透過mongoose來對照相同的jwt的id，來返回user資料，不然就是給予false，在postman會出現Unauthorized的訊息。

4.到router這裏，配置'/current' api，中間是已經配置好要如何解析驗證的passport負責驗證jwt，不透過session。然後返回response，回傳user訊息。

### 驗證作法:

在postman中的Body，在'/login'輸入自己的email, name, password，POST出去後，會得到 'Bear ' + token。

切換到'/current' tab中的Header，key輸入Authorization，value貼上我們所複製的token，然後GET送出，就會返回user資訊，而在終端機會得到jwt_payload資訊。

## 6.安裝相關vue套件