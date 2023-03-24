import { generatePhotoFilename } from "./multer";

describe("generatePhotoFilename", () => {
    test.each([
        ["image/png", "png"],
        ["image/jpg", "jpg"],
    ])(
        "Generates filename with correct extension when passed mimetype '%s'",
        (mimeType, expectedFileExtension) => {
            const fullFilename = generatePhotoFilename(mimeType);
            const [, fileExtension] = fullFilename.split(".");

            expect(fileExtension).toEqual(expectedFileExtension);
        }
    );
});
