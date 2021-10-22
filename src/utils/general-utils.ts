
import fs from 'fs';
const util = require('util');
import parse from 'csv-parse';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const readFile = util.promisify(fs.readFile);
const parseFilePromise = util.promisify(parse);

// Check to see if a file exists at a specific path on the file system
export const fileExists = (path: string): boolean => {
  let resultToReturn = false;
  try {
    resultToReturn = fs.existsSync(path)
  } catch (err) {
    console.error(err)
  }
  return resultToReturn;
}

// Get Rows from a CSV file
export const getRowsFromCSVFile = async (csvFilePath: string): Promise<any[]> => {
  // Confirm if the CSV file exists
  if (fileExists(csvFilePath)) {
    // if file exists, try to read it
    try {
      // read the file
      const fileData = await readFile(csvFilePath);
      // return promise of file data
      return await parseFilePromise(fileData);
    } catch (error) {
      console.log('Error ', error);
      return [];
    }
  } else {
    // if not, return empty array
    return [];
  }
}


export const writeCustomCSVFile = async (path: string, header: ICSVHeader[], records: any[], append: boolean): Promise<void> => {
  //  console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: header,
    append: append
  });

  return await csvWriter.writeRecords(records);
}

export interface ICSVHeader {
  id: string;
  title: string;
}

export const creatCSVHeadersFromLists = (listOfIds: string[], listOfColTitles: string[]): ICSVHeader[] => {
  const listToReturn: ICSVHeader[] = [];
  for (let i = 0; i < listOfIds.length; i++) {
    const id = listOfIds[i];
    const title = listOfColTitles[i];
    const column = {
      id: id,
      title: title
    }
    listToReturn.push(column);
  }
  return listToReturn;
}

export const deleteFile = (pathToDelete: string) => {
  if (fileExists(pathToDelete)) {
    fs.unlinkSync(pathToDelete);
  }
}

