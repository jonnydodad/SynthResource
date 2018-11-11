/**
* ************************************
*
* @module  server
* @author  jonnydodad
* @date    08/07/18
* @description 
*
* ************************************
*/
/* configured for [HMR] */

import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import synths from './synths';
import configDev from '../../build/webpack.dev.babel';

const isProd = process.env.NODE_ENV === 'production';

const app = express();
const compiler = webpack(configDev);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get-synths', (req, res) => {
	res.json(synths);
});

// app.post('/checkout', (req, res) => {
// 	const hasError = !req.body.items;
// 	let response;

// 	if (hasError) {
// 		response = {
// 			status: 'error',
// 			error: 'Invalid request.',
// 		};
// 	} else {
// 		response = {
// 			status: 'success',
// 			message: 'Your order was placed successfully.',
// 		};
// 	}

// 	res.json(response);
// });

if (!isProd) {
	app.use(require('webpack-dev-middleware')(compiler, {
	  publicPath: configDev.output.publicPath,
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	app.get('*', (req, res, next) => {
	  const filename = path.join(compiler.outputPath, 'index.html');
	  compiler.outputFileSystem.readFile(filename, (err, result) => {
	    if (err) {
	      return next(err);
	    }
	    res.set('content-type', 'text/html');
	    res.send(result);
	    res.end();
	  });
	});
} 
// else {
// 	app.use(compression());

//   app.use(express.static('dist/public', {
//     setHeaders(res, resPath) {
//       // do not set Cache-Control for index page
//       const isIndexFile = resPath.endsWith('/index.html');
//       if (!isIndexFile) {
//         res.setHeader('Cache-Control', '86400');
//       }
//     }
//   }));

//   app.get('/*',(req, res) => {
// 	  res.sendFile('index.html', {root: './dist/public'});
// 	});
// }

app.listen(3001, () => console.log('Synth Resource Center app listening on port 3001!'));
