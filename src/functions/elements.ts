type Element = {
    name: string;
    atomicNumber: number;
}

const elements: Element[] = [{
        name: "Hydrogen",
        atomicNumber: 1
    }, {
        name: "Helium",
        atomicNumber: 2
    }
];

export const getElements = async () => {
    return new Promise(
        resolve => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(elements)
            });
        }
    );
};