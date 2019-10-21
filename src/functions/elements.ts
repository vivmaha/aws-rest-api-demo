import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

type Element = {
  name: string;
  atomicNumber: number;
};

const elements: Element[] = [
  {
    name: "Hydrogen",
    atomicNumber: 1
  },
  {
    name: "Helium",
    atomicNumber: 2
  }
];

const getErrorResponse = (
  statusCode: number,
  message: string
): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify({ message })
});

export const getElements = async (): Promise<APIGatewayProxyResult> => {
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

  const element = elements.find(
    element => element.atomicNumber === atomicNumber
  );
  if (!element) {
    return getErrorResponse(404, "Element not found.");
  }
  return {
    statusCode: 200,
    body: JSON.stringify(element)
  };
};
