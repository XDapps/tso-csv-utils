import TSOSettings from 'tso-data-models/lib/models/tso-settings/TSOSettings';
import { getRowsFromCSVFile } from '..';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


export const readCurrentSettingsData = async (): Promise<TSOSettings> => {
  const settingsData: any[] = await getRowsFromCSVFile('./data/settings.csv');
  const settingsToReturn = new TSOSettings(settingsData[0], settingsData[1]);
  return settingsToReturn;
}

export const writeCurrentSettingsData = async (dataToWrite: TSOSettings): Promise<TSOSettings> => {
  const csvWriter = createCsvWriter({
    path: './data/settings.csv',
    header: [
      { id: 'secondsEarly', title: 'SUBMITEARLY' },
      { id: 'dataAnalysisWindow', title: 'ANALYSISTIME' }
    ], append: false
  });
  const records = [
    {
      secondsEarly: dataToWrite.secondsEarly,
      dataAnalysisWindow: dataToWrite.dataAnalysisWindow
    }
  ];
  return await csvWriter.writeRecords(records);
}

