import { TestBed } from '@angular/core/testing';

import { TeacherLoginService } from './teacher-login.service';

describe('TeacherLoginService', () => {
  let service: TeacherLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
