import { DataPoint } from 'tso-data-models';
import fs from  'fs';
import csv from 'csv-parser';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;


export const readCurrentEpochData = async (pathToRead: string): Promise<void> => {
  fs.createReadStream(pathToRead)
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
 }

export const writeCurrentEpochData = async (path: string, record: DataPoint): Promise<void> => {
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
      //bid: ,
      //ask: record.a,
      time: record.time
    }
  ];
  return await csvWriter.writeRecords(records);
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
      //bid: ,
      //ask: record.a,
      time: record.time
    }
  ];
  return await csvWriter.writeRecords(records);
}

export const readEpochResults = async (path: string): Promise<void> => {
  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

