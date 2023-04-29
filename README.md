
## ระบบสั่งอาหาร `socket.io`

#### วิธีการใช้งาน
###### วิธีการติดตั้ง
```cmd
npm init -y
```
###### ติดตั้ง Package
```cmd
npm i socket.io express nodemon
```

#### สร้างไฟล์
1. index.js
2. index.js
3. customer.js

#### เพิ่มโค้ดลงไฟล์

1. ไฟล์ index.js
```js
// import libraries
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// create app
const app = express();

// create server
const server = http.createServer(app);

// create socket
const io = socketIO(server);

// set up express routes
app.get('/customer', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
});

app.get('/shop', (req, res) => {
    res.sendFile(__dirname + '/shop.html');
});

// set up socket connection
io.on('connection', (socket) => {
    // console.log('a user connected');
    
    // send message to all connected clients
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
    // disconnect
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

// start server
server.listen(3000, () => {
  console.log('listening on *:3000');
});
```

2. ไฟล์ index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Socket.IO Example</title>
    <script src="/socket.io/socket.io.js"></script>
    <!-- Css -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

    <!-- Icon -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Itim&family=Kanit:wght@300&family=Prompt:wght@300&display=swap');
        *{
            font-family: 'Kanit', sans-serif;
        }
    </style>    
</head>
<body>
    <div class="d-flex justify-content-center">
        <div class="card w-50 mt-4">
            <div class="card-body">
                <h3>ฟอร์มสั่งสินค้า</h3>
                <form onsubmit="return sendMessage()">
                    <input placeholder="ชือเมนู" id="txt_menu"  class="form-control mb-3" autocomplete="off">
                    <input placeholder="จำนวน" id="txt_count" class="form-control mb-3" autocomplete="off">
                    <input placeholder="โต๊ะที่" id="txt_table" class="form-control mb-3" autocomplete="off">
                    <button class="btn btn-success">Send</button>
                </form>
            </div>
        </div>
    </div>
    <script>
        // connect to server
        const socket = io();
        
        // send message to server
        function sendMessage() {
            const txt_menu = document.getElementById('txt_menu').value;
            const txt_count = document.getElementById('txt_count').value;
            const txt_table = document.getElementById('txt_table').value;

            const message = `[x${txt_count}] - ชื่อสินค้า : ${txt_menu} - โต๊ะที่ : ${txt_table}`
            
            socket.emit('chat message', message);
            return false;
        }
    </script>
</body>
</html>
```

3. ไฟล์ shop.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Socket.IO Example</title>
    <script src="/socket.io/socket.io.js"></script>
    <!-- Css -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

    <!-- Icon -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Itim&family=Kanit:wght@300&family=Prompt:wght@300&display=swap');
        *{
            font-family: 'Kanit', sans-serif;
        }
    </style>    
</head>
<body>
    <!-- <ul id="messages"></ul> -->
    <div class="d-flex justify-content-center">
        <ul id="messages" class="list-group w-50 mt-3">
            <li class="list-group-item">เมนูทีกำลังดำเนินการ</li>
        </ul>
    </div>
    <script>
        const socket = io();

        socket.on('chat message', (msg) => {
            const messages = document.getElementById('messages');
            const li = document.createElement('li');
            li.setAttribute('id', 'myLiId');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            messages.appendChild(li);
            li.style.height = 'auto';

            const p = document.createElement('label');
            p.innerText = msg
            p.classList.add('d-flex', 'align-items-center')
            p.style.height = 'auto'
            li.appendChild(p);

            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-danger');
            btn.innerText = 'ลบเมนู';
            btn.onclick = function() {
                li.remove();
            }
            li.appendChild(btn);

        });
    </script>
</body>
</html>
```

## วิธีการรรัน
```cmd
nodemon
```

## การตอบกลับ
```cmd
listening on *:3000
```
