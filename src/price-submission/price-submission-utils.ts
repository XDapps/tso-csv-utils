
import { PriceSubmission } from 'tso-data-models';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export const writePriceSubmissionData = async (path: string, submission: PriceSubmission): Promise<void> => {
  //console.log(`Writing to ${path}`);
  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: 'epochNumber', title: 'EPOCHNUMBER' },
      { id: 'assetName', title: 'ASSET' },
      { id: 'ftsoRegistryAddress', title: 'FTSOREGISTRY' },
      { id: 'targetSubmitTime', title: 'TARGETSUBMIT' },
      { id: 'actualSubmitTime', title: 'ACTUALSUBMIT' },
      { id: 'randomNumber', title: 'RANDOM' },
      { id: 'submitPrice', title: 'SUBMITPRICE' }
    ], append: true
  });
  const record = [
    {
      epochNumber: submission.epochNumber,
      assetName: submission.assetName,
      ftsoRegistryAddress: submission.ftsoRegistryAddress,
      targetSubmitTime: submission.targetSubmitTime,
      actualSubmitTime: submission.actualSubmitTime,
      randomNumber: submission.randomNumber,
      submitPrice: submission.submitPrice
    }
  ];
  return await csvWriter.writeRecords(record);
}