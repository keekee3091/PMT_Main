import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from '../../services/project.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectService: ProjectService;

  const mockProjects = [
    { id: 1, name: 'Project 1', description: 'Description 1' },
    { id: 2, name: 'Project 2', description: 'Description 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, HttpClientTestingModule],
      providers: [ProjectService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch projects on init', () => {
    spyOn(projectService, 'getProjects').and.returnValue(of(mockProjects));

    component.ngOnInit();

    expect(component.projects.length).toBe(2);
    expect(component.projects).toEqual(mockProjects);
    expect(projectService.getProjects).toHaveBeenCalled();
  });

  it('should handle error when fetching projects', () => {
    spyOn(projectService, 'getProjects').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(component.projects.length).toBe(0);
    expect(projectService.getProjects).toHaveBeenCalled();
  });
});
