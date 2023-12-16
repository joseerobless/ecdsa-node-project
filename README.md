# ecdsa-node-project

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Usage Notes

Initial addresses & values and corresponding private/public keys:

/*
{
  privateKey: 'c1c7bda14b3e102f4d74085045a635366962bcc7650977c4d59e97ec58bb86db',
  publicKey: '02bc6148f1e1d11cb9ad897fffb5a5f1b5a2728f89a6f01244d1ca22ccfef7f6c6'
}
{
  privateKey: '1a827c0549785766f29b4cdd008a354e83c2e5b2dfeb0e9941815d74d77fcced',
  publicKey: '03580fedae343f810fc71ae0a3a103902d28b54e985c3d2bb29adeaaa9f22d481d'
}
{
  privateKey: 'bf387eaf8643b7e5a2488c7f4184c208fd4f328113f54a0acff83437bedeb893',
  publicKey: '02cd068122185b37ccd73e69cf5818efccd9b36bea6407700ce6edf1cdad396028'
}
 */
const balances = {
  "1244d1ca22ccfef7f6c6": 100,
  "2bb29adeaaa9f22d481d": 50,
  "700ce6edf1cdad396028": 75,
};

## To generate new public/private keys you can use server/scripts/generate.js
