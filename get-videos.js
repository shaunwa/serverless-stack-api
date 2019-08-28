import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName + '-videos',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    if (result.Items) {
      // Return the retrieved item
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Items not found." });
    }
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
