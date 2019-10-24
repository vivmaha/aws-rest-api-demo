import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

export type Element = {
  name: string;
  atomicNumber: number;
};

const tableName = process.env.TABLE_NAME;
const db = new DynamoDB.DocumentClient();

const dbItemToElement = (item: DocumentClient.AttributeMap): Element => {
  const name = item["name"] as string;
  if (name === undefined) {
    throw new Error("Missing [name] attribute from db item.");
  }

  const atomicNumber = item["atomicNumber"] as number;
  if (atomicNumber === undefined) {
    throw new Error("Missing [atomicNumber] attribute from db item.");
  }

  return { name, atomicNumber };
};

export const dbGetElements = async (): Promise<Element[]> => {
  const scanResult = await db.scan({ TableName: tableName }).promise();
  if (scanResult.LastEvaluatedKey) {
    throw new Error("Too many elements, we need to implement paging.");
  }
  return scanResult.Items.map(dbItemToElement);
};

export const dbGetElement = async (
  atomicNumber: number
): Promise<Element | undefined> => {
  const getResult = await db
    .get({
      TableName: tableName,
      Key: { atomicNumber }
    })
    .promise();
  if (!getResult.Item) {
    return undefined;
  }
  return dbItemToElement(getResult.Item);
};
