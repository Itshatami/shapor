
```
server
├─ app.js
├─ package-lock.json
├─ package.json
├─ public
├─ server.js
└─ src
   ├─ common
   │  ├─ constant
   │  │  └─ env.enum.js
   │  ├─ exception
   │  │  ├─ all-exception.handler.js
   │  │  └─ not-found.handler.js
   │  ├─ guard
   │  │  └─ auth.guard.js
   │  ├─ messages
   │  ├─ middleware
   │  └─ utils
   ├─ config
   │  ├─ mongoose.config.js
   │  └─ swagger.config.js
   └─ module
      ├─ app.routes.js
      ├─ auth
      │  ├─ auth.controller.js
      │  ├─ auth.message.js
      │  ├─ auth.routes.js
      │  ├─ auth.service.js
      │  └─ auth.swagger.js
      └─ user
         ├─ user.controller.js
         ├─ user.message.js
         ├─ user.model.js
         ├─ user.routes.js
         ├─ user.service.js
         └─ user.swagger.js

```