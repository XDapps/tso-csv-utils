import { DataPoint, OpenEpoch } from 'tso-data-models';
import fs from 'fs';
const util = require('util');
import parse from 'csv-parse';
import { fileExists, getRowsFromCSVFile } from '..';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const readFile = util.promisify(fs.readFile);
const parseFilePromise = util.promisify(parse);




export const writeCurrentEpochData = async (path: string, record: OpenEpoch): Promise<void> => {
  //console.log(`Writing to ${path}`);
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
      id: record.number,
      start: record.start,
      end: record.end
    }
  ];
  return await csvWriter.writeRecords(records);
}


export const writeEpochResults = async (path: string, epochNumber: number, currency: string, outputPrice: string): Promise<void> => {
  console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'epoch', title: 'Epoch' },
      { id: 'baseCurrency', title: 'BASE' },
      { id: 'outputPrice', title: 'PRICE' }
    ], append: true
  });
  const records = [
    {
      epoch: epochNumber,
      baseCurrency: currency,
      outputPrice: outputPrice
    }
  ];
  return await csvWriter.writeRecords(records);
}

export const writeEpochDetails = async (path: string, epochNumber: number, start: number, end: number): Promise<void> => {
  console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'epoch', title: 'EPOCH' },
      { id: 'start', title: 'START' },
      { id: 'end', title: 'END' }
    ], append: true
  });
  const records = [
    {
      epoch: epochNumber,
      start: start,
      end: end
    }
  ];
  return await csvWriter.writeRecords(records);
}

