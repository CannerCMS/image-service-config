// @flow
export function randomString(): string {
  return Math.random()
    .toString(36)
    .substr(2, 6);
}

export function splitFilename(fileName: string): {
  nameWithoutExtension: string,
  fileExtension: string
} {
  const fileExtension = fileName.split('.').slice().pop();
  const nameWithoutExtension = fileName.split('.').slice(-1).join('.');
  return {
    fileExtension,
    nameWithoutExtension
  };
}