const AWS = require("aws-sdk");

// const dynamo = new AWS.DynamoDB.DocumentClient();

const decodeForm = (base64EncodedString) => {
    try {
        const urlEncodedString = Buffer.from(base64EncodedString, 'base64').toString('utf8');
        const jsonObject = {}
        urlEncodedString.split("&").forEach(param => {
            const [oKey, oValue] = param.split("=");
            const dKey = decodeURIComponent(oKey.replace(/\+/g, " "));
            const dValue = decodeURIComponent(oValue.replace(/\+/g, " "));
            jsonObject[dKey] = dValue;
        });
        return jsonObject;
    } catch (error) {
        return error;
    }
};

exports.handler = async (event, context) => {
  
  let formData = decodeForm(event.body);
  
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

//   try {
//     switch (event.routeKey) {
//       case "GET /items/{id}":
//         body = await dynamo
//           .get({
//             TableName: "portfolio-table",
//             Key: {
//               id: event.pathParameters.id
//             }
//           }).promise()
//         let newViews = 1
//         if (body && body.Item && body.Item.views) {
//             newViews += body.Item.views
//         }
//         await dynamo.put({
//           TableName: "portfolio-table",
//           Item: {
//             id: event.pathParameters.id,
//             views: newViews
//           }
//         }).promise()
        
//          body = {
//              views: newViews
//          }
//         break;
//       case "GET /items":
//         body = await dynamo.scan({ TableName: "portfolio-table" }).promise();
//         break;
//       default:
//         throw new Error(`Unsupported route: "${event.routeKey}"`);
//     }
//   } catch (err) {
//     statusCode = 400;
//     body = err.message;
//   } finally {
//     body = JSON.stringify(body);
//   }

    formData.modified = true;

  return {
    statusCode,
    body: JSON.stringify(formData),
    headers
  };
};