# indoorpi_v2

# Client

```bash
npm install && bower install
```

# Gateway

```bash
npm install
```

# Auth service

```bash
npm install
```

# Gpio service

```bash
npm install
```

# Faye server

```bash
npm install
```

----------------------

# Start complete stack

## Install pm2
```bash
sudo npm install -g pm2
```

## Start microservices
```bash
pm2 start gateway/gateway.js auth_service/auth.js gpio_service/gpio.js faye/pubsub.js
```

## Start frontend
```bash
gulp serve
```

