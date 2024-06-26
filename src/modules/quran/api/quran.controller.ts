import BaseController, { type ApiHandler } from 'packages/server/base/controller';
import service from './quran.service';

class ApiQuranController extends BaseController {
  public GET_SurahList: ApiHandler<null> = async (req) => {
    try {
      const data = service.surahList.map((v) => ({
        ...v,
        url: `${req.url}/${v.number}`,
      }));
      return this.sendOK(data);
    } catch (error) {
      return this.handleException(error);
    }
  };

  public GET_SurahByNumber: ApiHandler<'surah_number'> = async (req, { params }) => {
    try {
      const start = this.searchParam(req, 'start', 1);
      const limit = this.searchParam(req, 'limit', 10);
      const data = service.surahByNumber(params.surah_number, start, limit);
      return this.sendOK(data);
    } catch (error) {
      return this.handleException(error);
    }
  };
}

const controller = new ApiQuranController();
export default controller;
