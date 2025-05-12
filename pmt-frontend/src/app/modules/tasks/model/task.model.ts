import { Project } from '../../projects/services/project.service';
import { User } from '../../users/services/user.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  project: Project;
  assignedTo?: User; 
}
