import { Controller } from 'egg';
import mongo from '../mongo';

export default class ProjectController extends Controller {
  async getPeojectTemplate() {
    const { ctx } = this;

    const data = await mongo().query('project');
    ctx.body = {
      code: 0,
      data,
    };
  }
}
