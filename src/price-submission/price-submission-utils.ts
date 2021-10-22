
import { AssetSubmission, AssetSubmissionFactory } from 'tso-data-models';
import { getRowsFromCSVFile } from '..';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export const writeAssetSubmissionData = async (path: string, submission: AssetSubmission): Promise<void> => {
  //console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'epochNumber', title: 'EPOCHNUMBER' },
      { id: 'assetName', title: 'ASSET' },
      { id: 'assetIndex', title: 'ASSETINDEX' },
      { id: 'assetPrice', title: 'ASSETPRICE' },
      { id: 'random', title: 'RANDOM' }
    ], append: true
  });

  const record = [
    {
      epochNumber: submission.epochNumber,
      assetName: submission.assetName,
      assetIndex: submission.assetIndex,
      assetPrice: submission.price,
      random: submission.random
    }
  ];

  return await csvWriter.writeRecords(record);
}

export const writeAssetResultsData = async (path: string, epochNumber: number, assetName: string, assetIndex: number, assetPrice: number): Promise<void> => {
  //console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'epochNumber', title: 'EPOCHNUMBER' },
      { id: 'assetName', title: 'ASSET' },
      { id: 'assetIndex', title: 'ASSETINDEX' },
      { id: 'assetPrice', title: 'ASSETPRICE' }
    ], append: true
  });

  const record = [
    {
      epochNumber: epochNumber,
      assetName: assetName,
      assetIndex: assetIndex,
      assetPrice: assetPrice
    }
  ];

  return await csvWriter.writeRecords(record);
}

export const getSubmissionData = async (filePath: string, epochToReveal: number): Promise<AssetSubmission[]> => {
  const rows = await getRowsFromCSVFile(filePath);
  console.log('Rows ', rows.length);
  const listOfSubmissions = AssetSubmissionFactory.fromCSVRows(rows);
  console.log('listOfSubmissions ', listOfSubmissions.length);
  const listToReturn: AssetSubmission[] = [];
  for (let i = 0; i < listOfSubmissions.length; i++) {
    const sub = listOfSubmissions[i];
  //  console.log('epochToReveal ', epochToReveal);
  //  console.log('sub.epochNumber  ', sub.epochNumber );
    if (sub.epochNumber == epochToReveal) {
    //  console.log('Match')
    //  console.log('listOfSubmissions ', listOfSubmissions.length);
      listToReturn.push(sub);
     }    
  }
  return listToReturn;
}

