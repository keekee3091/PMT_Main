import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project, ProjectService } from '../../services/project.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TaskService } from '../../../tasks/services/task.service';
import { Task } from '../../../tasks/model/task.model';
import { FormsModule } from '@angular/forms';

export type Member = {
  userId: number;
  role: string;
};

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})

export class ListProjectsComponent implements OnInit {

  projects: Project[] = [];
  showModal = false;
  projectTasks: any[] = [];
  currentProjectId: number | null = null;
  currentProject: Project | null = null;
  members: any[] = [];
  availableMembers: any[] = [];  
  showHistoryModal = false;
  taskHistory: any[] = [];
  showCreateModal = false;
  isAdminAssigned = false;

  newTask: any = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'PENDING',
    assignedToId: null
  };

  newProject = {
    name: '',
    description: '',
    startDate: '',
    ownerId: null,
    members: [] as Member[]
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Erreur chargement projets :', err)
    });

    this.loadAvailableMembers();  
  }

  loadAvailableMembers(): void {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe({
      next: (data) => {
        this.availableMembers = data.map(member => ({
          ...member,
          selected: false,  
          role: 'MEMBER'   
        }));
      },
      error: (err) => console.error('Erreur chargement membres', err)
    });
  }
  onMemberSelectionChange(member: any): void {
    if (member.selected && member.role === 'ADMIN') {
      this.isAdminAssigned = true;
      this.newProject.ownerId = member.id;  
    } else if (!member.selected && member.role === 'ADMIN') {
      this.isAdminAssigned = false;
      this.newProject.ownerId = null;
    }
  }

  openTaskModal(projectId: number): void {
    this.currentProjectId = projectId;
    this.currentProject = this.projects.find(p => p.id === projectId) || null;
    this.showModal = true;

    this.taskService.getTasksByProjectId(projectId).subscribe({
      next: (tasks) => {
        this.projectTasks = tasks.map(task => ({
          ...task,
          assignedToId: task.assignedTo?.id || null
        }));
      },
      error: (err) => console.error('Erreur chargement tâches :', err)
    });

    this.loadProjectMembers(projectId);
  }

  openHistoryModal(projectId: number): void {
    this.currentProject = this.projects.find(p => p.id === projectId) || null;
    this.showHistoryModal = true;

    this.http.get<any[]>(`http://localhost:8080/api/projects/${projectId}/task-history`).subscribe({
      next: (data) => this.taskHistory = data,
      error: (err) => console.error('Erreur chargement historique', err)
    });
  }

  closeHistoryModal(): void {
    this.showHistoryModal = false;
    this.taskHistory = [];
  }

  closeModal(): void {
    this.showModal = false;
    this.projectTasks = [];
    this.currentProjectId = null;
    this.currentProject = null;
    this.members = [];
  }

  loadProjectMembers(projectId: number): void {
    this.http.get<any[]>('http://localhost:8080/api/users').subscribe({
      next: (data) => this.members = data,
      error: (err) => console.error('Erreur chargement membres', err)
    });
  }

  addTask(): void {
    if (!this.currentProjectId) return;

    const taskToCreate = {
      ...this.newTask,
      projectId: this.currentProjectId
    };

    this.taskService.createTask(taskToCreate).subscribe({
      next: (created) => {
        this.projectTasks.push({
          ...created,
          assignedToId: created.assignedTo?.id || null
        });
        this.newTask = {
          title: '',
          description: '',
          dueDate: '',
          priority: 'MEDIUM',
          status: 'PENDING',
          assignedToId: null
        };
      },
      error: (err) => alert('Erreur ajout tâche : ' + err.message)
    });
  }

  updateTask(task: any): void {
    task.assignedTo = this.members.find(m => m.id === task.assignedToId);

    this.taskService.updateTask(task.id, task).subscribe({
      next: () => alert('Tâche mise à jour !'),
      error: (err) => alert('Erreur mise à jour : ' + err.message)
    });
  }

  toggleCreateProjectModal(): void {
    this.showCreateModal = !this.showCreateModal;
  }

  createProject(): void {
    debugger
    this.newProject.members = this.availableMembers
      .filter(member => member.selected)
      .map(member => ({
        userId: member.id,
        role: member.role
      }));

    if (!this.newProject.ownerId) {
      alert("L'administrateur (propriétaire) doit être sélectionné.");
      return;
    }

    this.projectService.createProject(this.newProject).subscribe({
      
      next: (created) => {
        this.projects.push(created);
        this.toggleCreateProjectModal();
        this.newProject = { name: '', description: '', startDate: '', ownerId: null, members: [] };
      },
      error: (err) => alert("Erreur création projet : " + err.message)
    });
  }
}

