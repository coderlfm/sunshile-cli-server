// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportProject from '../../../app/controller/project';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    project: ExportProject;
  }
}
