const http = require('http');
const httpProxy = require('http-proxy');
const program = require('commander');
const logger = require('./logger');

program
    .version('1.0.0')
    .option('-p, --port <n>', 'Port to accept requests on')
    .option('-t, --target <target>', 'Proxy target')
    .option('-d, --log-dir <dir>', 'Directory to store logs')
    .parse(process.argv);

const {logDir, target, port} = program;
const log = logger(logDir);
const proxy = httpProxy.createProxyServer({
    // Proxy options
});
const server = http.createServer(function (req, res) {
    log.log(req);
    proxy.web(req, res, {target});
});

console.log(`Server listening on port ${port}`);
server.listen(port);
