import { DataPoint, OpenEpoch } from 'tso-data-models';
import fs from 'fs';
const util = require('util');
import parse from 'csv-parse';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const readFile = util.promisify(fs.readFile);
const pareFilePromise = util.promisify(parse);


export const readCurrentEpochData = async (pathToRead: string): Promise<OpenEpoch> => {
  const csvRows: any[] = await getRowsFromCSVFile(pathToRead);
  const epochData = csvRows[1];
  console.log('epochData ', epochData);
  const epochToReturn = new OpenEpoch(epochData[1], epochData[2]);
  return epochToReturn;
}

export const writeCurrentEpochData = async (path: string, record: OpenEpoch): Promise<void> => {
  console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'start', title: 'START' },
      { id: 'end', title: 'END' }
    ]
  });
  const records = [
    {
      id: record.epochNumber,
      start: record.epochStart,
      end: record.epochEnd
    }
  ];
  return await csvWriter.writeRecords(records);
}

export const getRowsFromCSVFile = async (csvFilePath: string): Promise<any[]> => {
  const fileData = await readFile(csvFilePath);
  return pareFilePromise(fileData);
}



export const writeEpochResults = async (path: string, record: DataPoint): Promise<void> => {
  console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'exchange', title: 'EXCHANGE' },
      { id: 'baseCurrency', title: 'BASE' },
      { id: 'quoteCurrency', title: 'QUOTE' },
      { id: 'price', title: 'PRICE' },
      // { id: 'bid', title: 'BID' },
      // { id: 'ask', title: 'ASK' },
      { id: 'time', title: 'TIME' }
    ], append: true
  });
  const records = [
    {
      exchange: record.exchange,
      baseCurrency: record.baseCurrency,
      quoteCurrency: record.quoteCurrency,
      price: record.price,
      time: record.time
    }
  ];
  return await csvWriter.writeRecords(records);
}

export const readEpochResults = async (path: string): Promise<void> => {
  console.log("d")
}

