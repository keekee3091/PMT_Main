import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from './environments/environments';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, HttpClientTestingModule],
  platformBrowserDynamicTesting()
);

environment.apiUrl = 'http://mock-api-url';  
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
