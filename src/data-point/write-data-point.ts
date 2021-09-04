import { DataPoint } from 'tso-data-models';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;



export const writeDataSinglePoint = async (path: string, record: DataPoint): Promise<void> => {
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

export const writeListOfDataPoint = async (path: string, recordsList: DataPoint[]): Promise<void> => {
  const records: Record<string, any>[] = [];
  console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'exchange', title: 'EXCHANGE' },
      { id: 'baseCurrency', title: 'BASE' },
      { id: 'quoteCurrency', title: 'QUOTE' },
      { id: 'price', title: 'PRICE' },
      { id: 'time', title: 'TIME' }
    ], append: true
  });
  for (let i = 0; i < recordsList.length; i++) {
    const record: DataPoint = recordsList[i];
    const newItem = {
      exchange: record.exchange,
      baseCurrency: record.baseCurrency,
      quoteCurrency: record.quoteCurrency,
      price: record.price,
      time: record.time
    }
    records.push(newItem);
  }
  return await csvWriter.writeRecords(records);
}