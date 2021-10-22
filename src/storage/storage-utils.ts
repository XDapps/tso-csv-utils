import { getRowsFromCSVFile } from '..';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export const writeLastStorageDayCompleted = async (lastDay: number): Promise<number> => {
  //console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: './data/storage.csv',
    header: [
      { id: 'lastDay', title: 'LASTCOMPLETED' }
    ]
  });
  const record = [
    {
      lastDay: lastDay
    }
  ];
  return await csvWriter.writeRecords(record);
}

export const getLastStorageDayCompleted = async (): Promise<number> => {
  const csvRows: any[] = await getRowsFromCSVFile('./data/storage.csv');
  const storageData = csvRows[1];
  return parseInt(storageData[0]);
}