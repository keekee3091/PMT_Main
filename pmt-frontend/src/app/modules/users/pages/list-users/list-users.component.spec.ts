import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ListUsersComponent } from './list-users.component';
import { UserService, User } from '../../services/user.service';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let userService: UserService;

  const mockUsers: User[] = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'pass1' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'pass2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersComponent, HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should handle error when fetching users', () => {
    const consoleSpy = spyOn(console, 'error');
    spyOn(userService, 'getUsers').and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.users.length).toBe(0);
    expect(consoleSpy).toHaveBeenCalledWith('Erreur lors de la récupération des utilisateurs:', jasmine.any(Error));
  });
});
