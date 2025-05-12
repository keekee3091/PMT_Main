import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const dummyUsers: User[] = [
      { id: 1, email: 'test1@example.com', username: 'test1', password: 'password1' },
      { id: 2, email: 'test2@example.com', username: 'test2', password: 'password2' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should fetch a single user by ID', () => {
    const dummyUser: User = { id: 1, email: 'test1@example.com', username: 'test1', password: 'password1' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should create a new user', () => {
    const newUser: User = { id: 3, email: 'test3@example.com', username: 'test3', password: 'password3' };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should handle login', () => {
    const loginData = { email: 'test1@example.com', password: 'password1' };

    service.loginUser(loginData).subscribe(response => {
      expect(response).toEqual(loginData);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(loginData);
  });
});
