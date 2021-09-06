
import { PriceSubmission } from 'tso-data-models';
import { getRowsFromCSVFile } from '..';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export const writeLastStorageDayCompleted = async (lastDay: string): Promise<void> => {
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
  return await csvWriter.writeRecord(record);
}

export const getLastStorageDayCompleted = async (): Promise<string> => {
  const csvRows: any[] = await getRowsFromCSVFile('./storage');
  const storageData = csvRows[1];
  return storageData[0];
}