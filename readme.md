# Why
I.. uh, don't have a good reason


```javascript
const why = require('./why')

why({
    main(_args) {
        console.log("Starting")
        this.app.startExpress()
    },
    app: {
        port: 3000,
        startExpress() {
            const express = this.requires.express
            const app = express()

            app.get('/', this.routes.index)
            app.get('/about', this.routes.about)

            app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
        },
        routes: {
            index(req, res) {res.send('Hello World!')},
            about(req, res) {res.send('About page')}
        }
    }
})
```