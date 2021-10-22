import { DataPoint, DataPointFactory } from 'tso-data-models';
import { getRowsFromCSVFile } from '..';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export const writeDataSinglePoint = async (path: string, record: DataPoint, append: boolean): Promise<void> => {
//  console.log(`Writing to ${path}`);
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
    ], append: append
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
  if (record.price > 0) {
    return await csvWriter.writeRecords(records);
  } else {
    return;
  }
}

export const writeListOfDataPoints = async (path: string, recordsList: DataPoint[], append: boolean): Promise<void> => {
  const records: Record<string, any>[] = [];
 // console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'exchange', title: 'EXCHANGE' },
      { id: 'baseCurrency', title: 'BASE' },
      { id: 'quoteCurrency', title: 'QUOTE' },
      { id: 'price', title: 'PRICE' },
      { id: 'time', title: 'TIME' }
    ], append: append
  });
  for (let i = 0; i < recordsList.length; i++) {
    const record: DataPoint = recordsList[i];
    const newItem = {
      exchange: record.exchange,
      baseCurrency: record.baseCurrency,
      quoteCurrency: record.quoteCurrency,
      price: parseFloat(record.price.toString()),
      time: parseInt(record.time.toString())
    }
    if (newItem.price > 0) {
      records.push(newItem);
    }
  }
  if (records.length > 0) {
    return await csvWriter.writeRecords(records);
  } else {
    return;
  }
}


export const getListOfDataPointsFromCSVPath = async (filePath: string): Promise<DataPoint[]> => {
  const rows = await getRowsFromCSVFile(filePath);
  return DataPointFactory.fromCSVRows(rows);
}