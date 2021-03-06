import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dbGetElements, dbGetElement } from "./elements-db";

const getErrorResponse = (
  statusCode: number,
  message: string
): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify({ message })
});

export const getElements = async (): Promise<APIGatewayProxyResult> => {
  const elements = await dbGetElements();
  return {
    statusCode: 200,
    body: JSON.stringify(elements)
  };
};

export const getElement = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const parameterName = "id";
  const atomicNumberAsString = event.pathParameters[parameterName];
  if (!atomicNumberAsString) {
    return getErrorResponse(400, `Missing [${parameterName}].`);
  }
  const atomicNumber = Number(atomicNumberAsString);
  if (
    Number.isNaN(atomicNumber) ||
    atomicNumber !== Math.floor(atomicNumber) ||
    atomicNumber < 1
  ) {
    return getErrorResponse(
      400,
      `[${parameterName}] has to be a positive integer.`
    );
  }

  const element = await dbGetElement(atomicNumber);
  if (element === undefined) {
    return getErrorResponse(404, "Element not found.");
  }
  return {
    statusCode: 200,
    body: JSON.stringify(element)
  };
};
