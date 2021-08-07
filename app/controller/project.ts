import { Controller } from 'egg';

export default class ProjectController extends Controller {
  getPeojectTemplate() {
    const { ctx } = this;

    ctx.body = {
      code: 0,
      data: [
        { name: 'vue2标准模板', value: 'vue' },
        { name: 'vue2管理后台模板', value: 'vue-admin' },
      ],
    };
  }
}
